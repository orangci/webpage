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

const displayNameOverrides = new Set(['discord', 'myanimelist', 'goodreads']);
const dynamicCache = {};

const fetchDiscord = async id => {
  const res = await fetch(`https://api.lanyard.rest/v1/users/${id}`);
  const data = await res.json();
  return data?.data?.discord_user?.avatar
    ? `https://cdn.discordapp.com/avatars/${id}/${data.data.discord_user.avatar}`
    : null;
};

const fetchMAL = async username => {
  const res = await fetch(`https://api.jikan.moe/v4/users/${username}`);
  const data = await res.json();
  return data?.data?.images?.jpg?.image_url || null;
};

const fetchUnavatar = async path => `https://unavatar.io/${path}?ttl=12h`;

document.addEventListener('DOMContentLoaded', () => {
  const usernameEl = document.getElementById('username');
  const avatarImg = document.getElementById('dynamicPFP');
  const originalText = usernameEl.textContent;
  const originalImg = avatarImg?.src;

  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseover', async () => {
      const username = link.getAttribute('data-username');
      const key = usernameToServiceKey[username];
      const displayName = displayNameOverrides.has(key) ? 'orangc' : username;
      usernameEl.textContent = displayName;

      if (!key || !dynamicSources[key]) return;

      if (!dynamicCache[key]) {
        try {
          dynamicCache[key] = await dynamicSources[key]() || "./leaf.png";
        } catch {
          dynamicCache[key] = "./leaf.png";
        }
      }

      if (avatarImg) {
        avatarImg.src = dynamicCache[key];
        avatarImg.alt = `${displayName} profile picture`;
      }
    });

    link.addEventListener('mouseout', () => {
      usernameEl.textContent = originalText;
      if (avatarImg) avatarImg.src = originalImg;
    });
  });
});
