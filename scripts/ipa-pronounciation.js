 const usernameElement = document.getElementById('username');
  const originalContent = usernameElement.innerHTML; // Store the original HTML content

  usernameElement.addEventListener('mouseenter', () => {
    usernameElement.innerHTML = '<img src=\"./assets/leaf-small.png\" alt=\"pfp\" class=\"self-center pl-0 mx-2 mb-0 ml-0 size-12\">/ˈɒrɪn(d)ʒsiː/'; // Change to the new content
  });

  usernameElement.addEventListener('mouseleave', () => {
    usernameElement.innerHTML = originalContent; // Restore the original content
  });