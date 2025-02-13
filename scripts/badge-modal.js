// Get DOM elements
const openBadgeModalBtn = document.getElementById('openBadgeModalBtn');
const badgeModal = document.getElementById('badgeModal');

// Function to open the modal
openBadgeModalBtn.addEventListener('click', () => {
  badgeModal.classList.remove('hidden');
});

// Close the modal when clicking outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === badgeModal) {
    badgeModal.classList.add('hidden');
  }
});