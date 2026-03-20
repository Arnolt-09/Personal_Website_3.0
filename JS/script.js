// ========================================
// TYPEWRITER EFFECT
// ========================================

const nameElement = document.querySelector('.intro-text h1');
const descElement = document.querySelector('.intro-text p');

const nameText = "Arnolt";
const descText = "I'm currently studying at SMK Telkom Purwokerto majoring in Software Engineering";

let nameIndex = 0;
let descIndex = 0;
let typewriterTimeouts = [];
let isTypewriterRunning = false;

function clearTypewriter() {
    typewriterTimeouts.forEach(timeout => clearTimeout(timeout));
    typewriterTimeouts = [];
    isTypewriterRunning = false;
}

function startTypewriter() {
    clearTypewriter();
    nameIndex = 0;
    descIndex = 0;
    isTypewriterRunning = true;

    if (nameElement) nameElement.textContent = '';
    if (descElement) descElement.textContent = '';

    const timeout = setTimeout(() => {
        if (nameElement) {
            nameElement.classList.add('typewriter');
            typeName();
        }
    }, 500);
    typewriterTimeouts.push(timeout);
}

function typeName() {
    if (!isTypewriterRunning) return;
    if (nameIndex < nameText.length) {
        nameElement.textContent = nameText.substring(0, nameIndex + 1);
        nameIndex++;
        const timeout = setTimeout(typeName, 150);
        typewriterTimeouts.push(timeout);
    } else {
        const timeout = setTimeout(() => {
            if (!isTypewriterRunning) return;
            nameElement.classList.remove('typewriter');
            if (descElement) {
                descElement.classList.add('typewriter');
                typeDesc();
            }
        }, 300);
        typewriterTimeouts.push(timeout);
    }
}

function typeDesc() {
    if (!isTypewriterRunning) return;
    if (descIndex < descText.length) {
        descElement.textContent = descText.substring(0, descIndex + 1);
        descIndex++;
        const timeout = setTimeout(typeDesc, 50);
        typewriterTimeouts.push(timeout);
    } else {
        const timeout = setTimeout(() => {
            if (!isTypewriterRunning) return;
            descElement.classList.remove('typewriter');
            deleteText();
        }, 5000);
        typewriterTimeouts.push(timeout);
    }
}

function deleteText() {
    if (!isTypewriterRunning) return;
    let currentDescText = descElement.textContent;

    function deleteDesc() {
        if (!isTypewriterRunning) return;
        if (currentDescText.length > 0) {
            currentDescText = currentDescText.slice(0, -1);
            descElement.textContent = currentDescText;
            const timeout = setTimeout(deleteDesc, 20);
            typewriterTimeouts.push(timeout);
        } else {
            deleteName();
        }
    }

    function deleteName() {
        if (!isTypewriterRunning) return;
        let currentNameText = nameElement.textContent;
        function deleteNameChar() {
            if (!isTypewriterRunning) return;
            if (currentNameText.length > 0) {
                currentNameText = currentNameText.slice(0, -1);
                nameElement.textContent = currentNameText;
                const timeout = setTimeout(deleteNameChar, 100);
                typewriterTimeouts.push(timeout);
            } else {
                nameIndex = 0;
                descIndex = 0;
                const timeout = setTimeout(() => {
                    if (!isTypewriterRunning) return;
                    nameElement.classList.add('typewriter');
                    typeName();
                }, 500);
                typewriterTimeouts.push(timeout);
            }
        }
        deleteNameChar();
    }
    deleteDesc();
}

// ========================================
// INJECT CSS ANIMASI
// ========================================
(function injectAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* State awal */
        .card-hidden {
            opacity: 0;
            transform: translateY(28px);
            transition: none !important;
        }

        /* Masuk dari bawah */
        .card-enter-down {
            opacity: 0;
            transform: translateY(28px);
            transition: none !important;
        }

        /* Masuk dari atas */
        .card-enter-up {
            opacity: 0;
            transform: translateY(-28px);
            transition: none !important;
        }

        /* Visible */
        .card-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: opacity 0.5s ease, transform 0.5s ease !important;
        }

        /* Hover tetap jalan */
        .work-item.card-visible:hover {
            transform: translateY(-10px) !important;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .service-card.card-visible:hover {
            transform: translateY(-10px) !important;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        /* About section elements */
        .about-hidden {
            opacity: 0;
            transform: translateY(24px);
            transition: none !important;
        }
        .about-enter-up {
            opacity: 0;
            transform: translateY(-24px);
            transition: none !important;
        }
        .about-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: opacity 0.5s ease, transform 0.5s ease !important;
        }

        /* Skill tag hover tetap jalan */
        .skill-tag.about-visible:hover {
            background: #00a8ff !important;
            border-color: #00a8ff !important;
            color: white !important;
            transform: translateY(-3px) !important;
        }
    `;
    document.head.appendChild(style);
})();

// ========================================
// CARD ANIMATION — WORKS & SERVICES
// ========================================
let lastScrollY = window.scrollY;

function animateCards(sectionId, direction) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const cards = section.querySelectorAll('.work-item, .service-card');
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

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.id;
        if (id !== 'works' && id !== 'services') return;

        const currentScrollY = window.scrollY;
        const direction = currentScrollY >= lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;

        if (entry.isIntersecting) {
            animateCards(id, direction);
        } else {
            const section = document.getElementById(id);
            if (!section) return;
            section.querySelectorAll('.work-item, .service-card').forEach(el => {
                el.classList.remove('card-visible', 'card-enter-down', 'card-enter-up');
                el.classList.add('card-hidden');
            });
        }
    });
}, { threshold: 0.08 });

// ========================================
// ABOUT ANIMATION
// ========================================
function animateAbout(direction) {
    const section = document.getElementById('about');
    if (!section) return;

    // Animasikan: paragraf dulu, lalu skill tags
    const paragraphs = section.querySelectorAll('.about-content p');
    const skillTags  = section.querySelectorAll('.skill-tag');
    const allItems   = [...paragraphs, ...skillTags];

    const enterClass = direction === 'down' ? 'about-hidden' : 'about-enter-up';

    allItems.forEach((el, index) => {
        el.classList.remove('about-visible', 'about-hidden', 'about-enter-up');
        el.classList.add(enterClass);
        void el.offsetWidth;

        const delay = direction === 'down'
            ? index * 80
            : (allItems.length - 1 - index) * 80;

        setTimeout(() => {
            el.classList.remove(enterClass);
            el.classList.add('about-visible');
        }, delay);
    });
}

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const currentScrollY = window.scrollY;
        const direction = currentScrollY >= lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;

        if (entry.isIntersecting) {
            animateAbout(direction);
        } else {
            // Reset saat keluar viewport
            const section = document.getElementById('about');
            if (!section) return;
            section.querySelectorAll('.about-content p, .skill-tag').forEach(el => {
                el.classList.remove('about-visible', 'about-enter-up');
                el.classList.add('about-hidden');
            });
        }
    });
}, { threshold: 0.08 });

// ========================================
// INIT
// ========================================
function initAnimations() {
    // Works & Services
    document.querySelectorAll('.work-item, .service-card').forEach(el => {
        el.classList.add('card-hidden');
    });
    document.querySelectorAll('#works, #services').forEach(s => sectionObserver.observe(s));

    // About
    document.querySelectorAll('#about .about-content p, #about .skill-tag').forEach(el => {
        el.classList.add('about-hidden');
    });
    const aboutSection = document.getElementById('about');
    if (aboutSection) aboutObserver.observe(aboutSection);
}

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
}, { passive: true });

// ========================================
// LOAD
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    startTypewriter();
    initAnimations();
});