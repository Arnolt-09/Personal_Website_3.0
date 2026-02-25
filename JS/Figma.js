// Smooth scroll navigation - HANYA untuk nav links!
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Restore last active section on page load
window.addEventListener('load', () => {
    const lastSection = sessionStorage.getItem('lastActiveSection');
    
    if (lastSection) {
        // Hide all sections first
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the last active section
        const targetSection = document.getElementById(lastSection);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Update nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${lastSection}`) {
                    link.classList.add('active');
                }
            });
            
            // Scroll to section
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }
    
    document.body.style.opacity = '1';
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get target section
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Save current section to sessionStorage
            sessionStorage.setItem('lastActiveSection', targetId);
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section with animation
            setTimeout(() => {
                targetSection.classList.add('active');
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    });
});

// Intersection Observer for scroll-triggered animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Update active nav link based on visible section
            const sectionId = entry.target.getAttribute('id');
            
            // Save to sessionStorage
            sessionStorage.setItem('lastActiveSection', sectionId);
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {   
    observer.observe(section);
});

// Work item links - Save section before navigating
const workItems = document.querySelectorAll('.work-item');

workItems.forEach(item => {
    item.addEventListener('click', function(e) {
        // Save current section before navigating
        const currentSection = document.querySelector('section.active');
        if (currentSection) {
            sessionStorage.setItem('lastActiveSection', currentSection.id);
        }
        
        console.log('Navigating to:', this.getAttribute('href'));
    });
});

// Add parallax effect to portfolio cards
const portfolioCards = document.querySelectorAll('.portfolio-card');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    portfolioCards.forEach((card, index) => {
        const speed = (index + 1) * 2;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});