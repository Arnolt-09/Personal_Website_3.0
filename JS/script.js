// ========================================
// TYPEWRITER EFFECT dengan Stop Function
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
// FIX ANIMATION UNTUK CAREER SECTION
// ========================================

// Intersection Observer untuk animate elements saat scroll
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

// Observe semua animated elements
function initAnimations() {
    const animatedElements = document.querySelectorAll('.work-item, .service-card, .portfolio-card');
    
    animatedElements.forEach((el, index) => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        // Check kalau udah di viewport, langsung animate
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }, index * 80);
        }
        
        // Observe untuk scroll animation
        animationObserver.observe(el);
    });
}

// Re-init animations saat section active berubah (untuk inline script observer)
const originalObserverCallback = window.IntersectionObserver;
let checkInterval = setInterval(() => {
    const activeSection = document.querySelector('section.active');
    if (activeSection && activeSection.id === 'works') {
        initAnimations();
    }
}, 500);

// Initial load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    startTypewriter();
    initAnimations();
});