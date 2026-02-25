// Back button handler
const backButton = document.querySelector('.back-button');
if (backButton) {
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.history.back();
    });
}

// Get all school cards
const schoolCards = document.querySelectorAll('.school-card');
const educationContainer = document.querySelector('.education-container');

// Parallax effect untuk mouse movement (subtle)
let isParallaxEnabled = true;

document.addEventListener('mousemove', (e) => {
    if (!isParallaxEnabled) return;
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Parallax untuk school cards
    schoolCards.forEach((card, index) => {
        // Skip if card is hovered
        if (card.matches(':hover')) return;
        
        const speed = (index + 1) * 0.3;
        const x = (mouseX - 0.5) * speed * 8;
        const y = (mouseY - 0.5) * speed * 8;
        
        card.style.transition = 'transform 0.3s ease';
        card.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Subtle parallax untuk education container
    if (educationContainer) {
        const containerSpeed = 0.5;
        const containerX = (mouseX - 0.5) * containerSpeed * 5;
        const containerY = (mouseY - 0.5) * containerSpeed * 5;
        
        educationContainer.style.transition = 'transform 0.5s ease';
        educationContainer.style.transform = `translate(${containerX}px, ${containerY}px)`;
    }
});

// School card hover effects
schoolCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        isParallaxEnabled = false;
        this.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        this.style.transform = 'translate(0, 0)';
        setTimeout(() => {
            isParallaxEnabled = true;
        }, 100);
    });
});

// School card click handlers (with ripple effect)
schoolCards.forEach(card => {
    card.addEventListener('click', function(e) {
        const schoolName = this.querySelector('h3').textContent;
        
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
        
        console.log(`Opening location for: ${schoolName}`);
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
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .education-container {
        animation: fadeInUp 0.8s ease;
    }
    
    .school-card {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
    }
    
    .school-card:nth-child(1) {
        animation-delay: 0.2s;
    }
    
    .school-card:nth-child(2) {
        animation-delay: 0.3s;
    }
`;
document.head.appendChild(style);

// Smooth page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Trigger animations
    if (educationContainer) {
        educationContainer.style.opacity = '1';
    }
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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