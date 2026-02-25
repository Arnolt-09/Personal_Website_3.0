// Back button handler
const backButton = document.querySelector('.back-button');
if (backButton) {
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.history.back();
    });
}

// Get all project cards
const projectCards = document.querySelectorAll('.project-card');

// Parallax effect untuk mouse movement (subtle)
let isParallaxEnabled = true;

document.addEventListener('mousemove', (e) => {
    if (!isParallaxEnabled) return;
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    projectCards.forEach((card, index) => {
        // Skip if card is hovered
        if (card.matches(':hover')) return;
        
        const speed = (index % 3 + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 10;
        const y = (mouseY - 0.5) * speed * 10;
        
        card.style.transition = 'transform 0.3s ease';
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Card hover effects
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        isParallaxEnabled = false;
        this.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        this.style.transform = 'translateY(-15px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        this.style.transform = 'translate(0, 0)';
        setTimeout(() => {
            isParallaxEnabled = true;
        }, 100);
    });
});

// View button handlers
const viewButtons = document.querySelectorAll('.view-btn');

viewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const card = e.target.closest('.project-card');
        const title = card.querySelector('h3').textContent;
        
        // Click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
        
        console.log(`Opening project: ${title}`);
        
        // Uncomment untuk buka link project
        // window.open('https://your-project-link.com', '_blank');
    });
});

// Card click handlers (with ripple effect)
projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't trigger if clicking the view button
        if (e.target.classList.contains('view-btn')) return;
        
        const title = this.querySelector('h3').textContent;
        
        // Create ripple effect
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        console.log(`Card clicked: ${title}`);
    });
});

// Add ripple animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(50);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});