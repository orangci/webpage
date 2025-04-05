const fallbackIcons = {
  default: './assets/leaf-small.png',
  discord: './assets/cirno.png',
  github: './assets/leaf-small.png',
  myanimelist: './assets/cirno.png',
  twitter: './assets/leaf-small.png',
  youtube: './assets/leaf-small.png',
  twitch: './assets/leaf-small.png',
  mastodon: './assets/leaf-small.png',
  cirno: './assets/cirno.png',
};

const dynamicSources = {
  discord: () => FetchDiscordPfp('961063229168164864'),
  github: () => fetchGitHubPfp('orangci'),
  myanimelist: () => fetchMyAnimeListPfp('orangc'),
  twitter: () => fetchTwitterPfp('orxngc'),
  youtube: () => fetchYouTubePfp('@orangc'),
  twitch: () => fetchTwitchPfp('orangci'),
};

const usernameToServiceKey = {
  'discord': 'discord',
  '@orangci': 'github',
  'myanimelist': 'myanimelist',
  'goodreads': 'myanimelist',
  '@orxngc': 'twitter',
  '@orangc': 'youtube',
  '/u/orangc': 'reddit',
  '@orangc@mastodon.social': 'mastodon',
  '@orangc.net': 'bluesky',
  'orangci': 'namemc',
  '@orangc:matrix.org': 'matrix',
};

const dynamicPfps = {};
const loadingPromises = {};

async function FetchDiscordPfp(userId) {
  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
    if (!response.ok) throw new Error("Lanyard API error");
    const data = await response.json();
    const avatar = data?.data?.discord_user?.avatar;
    return avatar ? `https://cdn.discordapp.com/avatars/${userId}/${avatar}` : null;
  } catch (error) {
    console.error("Error fetching Discord pfp:", error);
    return null;
  }
}

async function fetchGitHubPfp(username) {
  try {
    const response = await fetch(`https://unavatar.io/${username}`);
    if (!response.ok) throw new Error("GitHub avatar fetch failed");
    const data = await response.json();
    return data?.url || null;
  } catch (error) {
    console.error("GitHub error:", error);
    return null;
  }
}

async function fetchMyAnimeListPfp(username) {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/users/${username}`);
    if (!response.ok) throw new Error("MAL API error");
    const data = await response.json();
    return data?.data?.images?.jpg?.image_url || null;
  } catch (error) {
    console.error("MyAnimeList error:", error);
    return null;
  }
}

async function fetchTwitterPfp(username) {
  try {
    const response = await fetch(`https://unavatar.io/twitter/${username}`);
    if (!response.ok) throw new Error("Twitter avatar fetch failed");
    const data = await response.json();
    return data?.url || null;
  } catch (error) {
    console.error("Twitter error:", error);
    return null;
  }
}

async function fetchYouTubePfp(username) {
  try {
    const response = await fetch(`https://unavatar.io/youtube/${username}`);
    if (!response.ok) throw new Error("YouTube avatar fetch failed");
    const data = await response.json();
    return data?.url || null;
  } catch (error) {
    console.error("YouTube error:", error);
    return null;
  }
}

async function fetchTwitchPfp(username) {
  try {
    const response = await fetch(`https://unavatar.io/twitch/${username}`);
    if (!response.ok) throw new Error("Twitch avatar fetch failed");
    const data = await response.json();
    return data?.url || null;
  } catch (error) {
    console.error("Twitch error:", error);
    return null;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const usernameElement = document.getElementById('username');
  const originalUsername = usernameElement.innerHTML;
  const socialLinks = document.querySelectorAll('.social-link');

  socialLinks.forEach(link => {
    link.addEventListener('mouseover', function () {
      const username = this.getAttribute('data-username');
      const serviceKey = usernameToServiceKey[username];
      const fallback = fallbackIcons[serviceKey] || fallbackIcons.default;

      let displayName = username;
      if (['goodreads', 'myanimelist', 'discord'].includes(serviceKey)) {
        displayName = 'orangc';
      }

      // 1. Show fallback immediately
      usernameElement.innerHTML = `<img src="${fallback}" alt="pfp" class="self-center pl-0 mx-2 mb-0 ml-0 rounded-full size-12">${displayName}`;

      // 2. Start loading dynamic avatar if not already loaded/fetching
      if (!dynamicPfps[serviceKey] && !loadingPromises[serviceKey] && dynamicSources[serviceKey]) {
        loadingPromises[serviceKey] = dynamicSources[serviceKey]().then(pfp => {
          dynamicPfps[serviceKey] = pfp || fallback;

          // 3. If user is still hovering, update to dynamic pfp
          if (usernameElement.innerText === displayName) {
            usernameElement.innerHTML = `<img src="${dynamicPfps[serviceKey]}" alt="pfp" class="self-center pl-0 mx-2 mb-0 ml-0 rounded-full size-12">${displayName}`;
          }
        });
      }

      // 3b. If it's already cached, show it immediately
      if (dynamicPfps[serviceKey]) {
        usernameElement.innerHTML = `<img src="${dynamicPfps[serviceKey]}" alt="pfp" class="self-center pl-0 mx-2 mb-0 ml-0 rounded-full size-12">${displayName}`;
      }
    });

    link.addEventListener('mouseout', function () {
      usernameElement.innerHTML = originalUsername;
    });
  });
});
