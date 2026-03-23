// ========================================
// INJECT CSS
// ========================================
(function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        body { opacity: 0; transition: opacity 0.4s ease; }

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

        @keyframes ripple {
            to { transform: scale(50); opacity: 0; }
        }

        /* Semua elemen mulai tersembunyi */
        .education-header,
        .education-description,
        .schools-container {
            opacity: 0;
        }

        /* Animasi masuk — fadeInUp */
        .fade-in-up {
            animation: fadeInUp 0.7s ease forwards;
        }

        /* Card state */
        .card-hidden {
            opacity: 0;
            transform: translateY(28px);
            transition: none !important;
        }
        .card-enter-down {
            opacity: 0;
            transform: translateY(28px);
            transition: none !important;
        }
        .card-enter-up {
            opacity: 0;
            transform: translateY(-28px);
            transition: none !important;
        }
        .card-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: opacity 0.55s ease, transform 0.55s ease !important;
        }

        /* Hover card */
        .school-card.card-visible:hover {
            transform: translateY(-10px) !important;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
    `;
    document.head.appendChild(style);
})();

// ========================================
// ENTRANCE ANIMATION — saat halaman load
// ========================================
function runEntranceAnimations() {
    const header      = document.querySelector('.education-header');
    const description = document.querySelector('.education-description');
    const container   = document.querySelector('.schools-container');

    // Header — muncul pertama
    setTimeout(() => {
        if (header) header.classList.add('fade-in-up');
    }, 100);

    // Description — muncul kedua
    setTimeout(() => {
        if (description) description.classList.add('fade-in-up');
    }, 280);

    // Schools container — muncul ketiga (card animasi sendiri via observer)
    setTimeout(() => {
        if (container) container.style.opacity = '1';
    }, 460);
}

// ========================================
// CARD ANIMATION — bidirectional scroll
// ========================================
let lastScrollY = window.scrollY;

function animateCards(direction) {
    const cards = document.querySelectorAll('.school-card');
    const enterClass = direction === 'down' ? 'card-enter-down' : 'card-enter-up';

    cards.forEach((el, index) => {
        el.classList.remove('card-visible', 'card-enter-down', 'card-enter-up', 'card-hidden');
        el.classList.add(enterClass);
        void el.offsetWidth;

        const delay = direction === 'down'
            ? index * 90
            : (cards.length - 1 - index) * 90;

        setTimeout(() => {
            el.classList.remove(enterClass);
            el.classList.add('card-visible');
        }, delay);
    });
}

function resetCards() {
    document.querySelectorAll('.school-card').forEach(el => {
        el.classList.remove('card-visible', 'card-enter-down', 'card-enter-up');
        el.classList.add('card-hidden');
    });
}

const schoolsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const currentScrollY = window.scrollY;
        const direction = currentScrollY >= lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;

        if (entry.isIntersecting) {
            animateCards(direction);
        } else {
            resetCards();
        }
    });
}, { threshold: 0.1 });

// ========================================
// PARALLAX — container saja
// ========================================
const educationContainer = document.querySelector('.education-container');

document.addEventListener('mousemove', (e) => {
    if (!educationContainer) return;
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    educationContainer.style.transition = 'transform 0.8s ease';
    educationContainer.style.transform  = `translate(${(mouseX - 0.5) * 4}px, ${(mouseY - 0.5) * 4}px)`;
});

// ========================================
// RIPPLE EFFECT
// ========================================
document.querySelectorAll('.school-card').forEach(card => {
    card.addEventListener('click', function (e) {
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        ripple.style.cssText = `
            position: absolute;
            width: 10px; height: 10px;
            background: rgba(106, 168, 255, 0.35);
            border-radius: 50%;
            transform: scale(0);
            left: ${e.clientX - rect.left}px;
            top: ${e.clientY - rect.top}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ========================================
// BACK BUTTON
// ========================================
const backButton = document.querySelector('.back-button');
if (backButton) {
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.history.back();
    });
}

// ========================================
// LOAD
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';

    // Jalankan animasi masuk
    runEntranceAnimations();

    // Set card hidden, observe untuk animasi card
    document.querySelectorAll('.school-card').forEach(el => {
        el.classList.add('card-hidden');
    });

    const schoolsContainer = document.querySelector('.schools-container');
    if (schoolsContainer) schoolsObserver.observe(schoolsContainer);
});

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
}, { passive: true });