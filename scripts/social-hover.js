document.addEventListener('DOMContentLoaded', function() {
  const socialLinks = document.querySelectorAll('.social-link');
  const usernameElement = document.getElementById('username');
  const originalUsername = usernameElement.innerHTML;

  socialLinks.forEach(link => {
    link.addEventListener('mouseover', function() {
      const newUsername = this.getAttribute('data-username');
      if (newUsername) {
        usernameElement.innerHTML = `<img src="https://avatars.githubusercontent.com/u/90866414?size=48" alt="pfp" class="self-center pl-0 mx-2 mb-0 ml-0 size-12">${newUsername}`;
      }
    });

    link.addEventListener('mouseout', function() {
      usernameElement.innerHTML = originalUsername;
    });
  });
});
