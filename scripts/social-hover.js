async function fetchDiscordStatus(userId) {
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


const dynamicSources = {
  discord: async () => await fetchDiscordStatus('961063229168164864'),
  github: async () => await fetchGitHubPfp('orangci'),
  myanimelist: async () => await fetchMyAnimeListPfp('orangc'),
  twitter: async () => await fetchTwitterPfp('orxngc'),
  youtube: async () => await fetchYouTubePfp('@orangc'),
  twitch: async () => await fetchTwitchPfp('orangci'),
};

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

const dynamicPfps = {};

document.addEventListener('DOMContentLoaded', async function () {
  const usernameElement = document.getElementById('username');
  const originalUsername = usernameElement.innerHTML;
  const socialLinks = document.querySelectorAll('.social-link');

  // Preload dynamic profile pictures
  for (const key in dynamicSources) {
    dynamicPfps[key] = await dynamicSources[key]() || fallbackIcons[key] || fallbackIcons.default;
  }

  socialLinks.forEach(link => {
    link.addEventListener('mouseover', function () {
      const username = this.getAttribute('data-username');
      let content;

      if (['goodreads', 'myanimelist'].includes(username)) {
        const pfp = dynamicPfps[username] || fallbackIcons.cirno;
        content = `<img src="${pfp}" alt="pfp" class="self-center pl-0 mx-2 mb-0 ml-0 rounded-full size-12">orangc`;
      } else if (dynamicPfps[username]) {
        content = `<img src="${dynamicPfps[username]}" alt="pfp" class="self-center pl-0 mx-2 mb-0 ml-0 rounded-full size-12">${username}`;
      } else {
        content = `<img src="${fallbackIcons[username] || fallbackIcons.default}" alt="pfp" class="self-center pl-0 mx-2 mb-0 ml-0 size-12">${username}`;
      }

      usernameElement.innerHTML = content;
    });

    link.addEventListener('mouseout', function () {
      usernameElement.innerHTML = originalUsername;
    });
  });
});
