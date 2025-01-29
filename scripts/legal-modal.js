// Get DOM elements
const openModalBtn = document.getElementById('openLegalModalBtn');
const modal = document.getElementById('legalModal');

// Function to open the modal
openModalBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

// Close the modal when clicking outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
});
