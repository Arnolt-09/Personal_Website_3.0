
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

// FIX: Safe back button handler untuk My Tech section
const backButton = document.querySelector('.back-button'); // Sesuaikan dengan class tombol back kamu

if (backButton) {
    backButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Cek apakah ada history sebelumnya
        if (document.referrer && document.referrer.includes(window.location.hostname)) {
            // Jika ada history internal, kembali ke halaman sebelumnya
            window.history.back();
        } else {
            // Jika tidak ada history atau dari external, redirect ke homepage atau section career
            window.location.href = '#career'; // Atau bisa '/' untuk homepage
            
            // Atau kalau mau ke halaman tertentu:
            // window.location.href = '/career.html';
        }
    });
}

// ALTERNATIF: Jika kamu punya beberapa tombol back
document.querySelectorAll('.back-btn, .btn-back, [data-action="back"]').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Safe navigation
        if (document.referrer && document.referrer.includes(window.location.hostname)) {
            window.history.back();
        } else {
            // Redirect ke halaman utama career section
            window.location.href = '#career';
        }
    });
});