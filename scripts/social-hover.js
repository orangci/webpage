document.addEventListener('DOMContentLoaded', function () {
  const socialLinks = document.querySelectorAll('.social-link');
  const usernameElement = document.getElementById('username');
  const originalUsername = usernameElement.innerHTML;

  socialLinks.forEach(link => {
    link.addEventListener('mouseover', function () {
      const newUsername = this.getAttribute('data-username');
      const cirnoUsernames = ['discord', 'goodreads'];
      if (cirnoUsernames.includes(newUsername)) {
        usernameElement.innerHTML = `<img src="./assets/cirno.png" alt="pfp" class="self-center pl-0 mx-2 mb-0 ml-0 rounded-full size-12">orangc`;
      } else if (newUsername) {
        usernameElement.innerHTML = `<img src="./assets/leaf-small.png" alt="pfp" class="self-center pl-0 mx-2 mb-0 ml-0 size-12">${newUsername}`;
      }
    });

    link.addEventListener('mouseout', function () {
      usernameElement.innerHTML = originalUsername;
    });
  });
});
