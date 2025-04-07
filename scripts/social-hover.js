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
  discord: () => fetchDiscord('961063229168164864'),
  github: () => fetchUnavatar('orangci'),
  myanimelist: () => fetchMAL('orangc'),
  twitter: () => fetchUnavatar('x/orxngc'),
  youtube: () => fetchUnavatar('youtube/orangc'),
  twitch: () => fetchUnavatar('twitch/orangci'),
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

const dynamicPfps = {}, loadingPromises = {};

const display = (el, img, name) => {
  el.innerHTML = `<img src="${img}" alt="pfp" class="self-center pl-0 mx-2 mb-0 ml-0 rounded-full size-12">${name}`;
};

const fetchDiscord = async id => {
  try {
    const r = await fetch(`https://api.lanyard.rest/v1/users/${id}`);
    const j = await r.json();
    return j?.data?.discord_user?.avatar ? `https://cdn.discordapp.com/avatars/${id}/${j.data.discord_user.avatar}` : null;
  } catch (e) {
    console.error("Discord error:", e);
    return null;
  }
};

const fetchMAL = async username => {
  try {
    const r = await fetch(`https://api.jikan.moe/v4/users/${username}`);
    const j = await r.json();
    return j?.data?.images?.jpg?.image_url || null;
  } catch (e) {
    console.error("MAL error:", e);
    return null;
  }
};

const fetchUnavatar = async path => `https://unavatar.io/${path}?ttl=12h`;

document.addEventListener('DOMContentLoaded', () => {
  const usernameEl = document.getElementById('username');
  const original = usernameEl.innerHTML;

  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseover', async () => {
      const username = link.getAttribute('data-username');
      const key = usernameToServiceKey[username];
      const fallback = fallbackIcons[key] || fallbackIcons.default;
      const name = ['goodreads', 'myanimelist', 'discord'].includes(key) ? 'orangc' : username;

      display(usernameEl, fallback, name);

      if (dynamicPfps[key]) {
        display(usernameEl, dynamicPfps[key], name);
      } else if (!loadingPromises[key] && dynamicSources[key]) {
        loadingPromises[key] = dynamicSources[key]().then(pfp => {
          dynamicPfps[key] = pfp || fallback;
          if (usernameEl.innerText === name) display(usernameEl, dynamicPfps[key], name);
        });
      }
    });

    link.addEventListener('mouseout', () => {
      usernameEl.innerHTML = original;
    });
  });
});
