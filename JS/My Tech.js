// Get all tech cards
const techCards = document.querySelectorAll('.tech-card');

// Add click event listener to each card
techCards.forEach(card => {
    card.addEventListener('click', function() {
        const techName = this.querySelector('.tech-name').textContent;
        console.log(`Clicked on ${techName} card`);
        // You can add more functionality here, like opening a modal or navigating to detail page
    });
});

// Optional: Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});