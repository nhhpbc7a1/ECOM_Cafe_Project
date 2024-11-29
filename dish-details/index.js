document.addEventListener('DOMContentLoaded', () => {
    // Close button functionality
    const closeButton = document.getElementById('close-btn');
    closeButton.addEventListener('click', () => {
      const card = document.getElementById('food-card');
      card.style.display = 'none'; // Hides the card
    });
  
    // Share button functionality
    const shareButton = document.getElementById('share-btn');
    shareButton.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href) // Copy the current URL
        .then(() => alert('Link copied to clipboard!'))
        .catch(() => alert('Failed to copy the link.'));
    });
  
    // Add-to-basket button functionality
    const addToBasketButton = document.getElementById('add-to-basket-btn');
    addToBasketButton.addEventListener('click', () => {
      alert('Item added to the basket!');
    });
  });
  