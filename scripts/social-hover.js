async function fetchDiscordStatus(userId) {
  try {
      const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch Discord profile picture: maybe the Lanyard API is down");

      const data = await response.json();
      const avatar = data?.data?.discord_user?.avatar; // Use optional chaining to avoid errors
      return avatar ? `https://cdn.discordapp.com/avatars/${userId}/${avatar}` : null; // Return null if no avatar
  } catch (error) {
      console.error("Error fetching Discord pfp:", error);
      return null; // Return null on error
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  const discordUserId = '961063229168164864'; // Replace with the actual user ID
  const discordPfp = await fetchDiscordStatus(discordUserId); // Fetch the Discord profile picture

  const socialLinks = document.querySelectorAll('.social-link');
  const usernameElement = document.getElementById('username');
  const originalUsername = usernameElement.innerHTML;

  socialLinks.forEach(link => {
    link.addEventListener('mouseover', function () {
      const newUsername = this.getAttribute('data-username');
      const cirnoUsernames = ['goodreads', 'myanimelist'];
      const discordUsername = ['discord'];
      if (cirnoUsernames.includes(newUsername)) {
        usernameElement.innerHTML = `<img src="./assets/cirno.png" alt="pfp" class="self-center pl-0 mx-2 mb-0 ml-0 rounded-full size-12">orangc`;
      } else if (discordUsername.includes(newUsername)) {
        usernameElement.innerHTML = `<img src="${discordPfp || './assets/leaf.png'}" alt="pfp" class="self-center pl-0 mx-2 mb-0 ml-0 rounded-full size-12">${newUsername}`;
      } else if (newUsername) {
        usernameElement.innerHTML = `<img src="./assets/leaf-small.png" alt="pfp" class="self-center pl-0 mx-2 mb-0 ml-0 size-12">${newUsername}`;
      }
    });

    link.addEventListener('mouseout', function () {
      usernameElement.innerHTML = originalUsername;
    });
  });
});
