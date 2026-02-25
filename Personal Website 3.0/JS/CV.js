// Cek apakah iframe berhasil load
const iframe = document.querySelector('.pdf-viewer');
const fallback = document.querySelector('.fallback');

// Handle error jika PDF tidak bisa dimuat
if (iframe) {
    iframe.onerror = function() {
        iframe.style.display = 'none';
        if (fallback) {
            fallback.style.display = 'block';
        }
    };
}

// Optional: Tambahkan loading indicator
window.addEventListener('load', function() {
    console.log('CV Viewer loaded successfully');
});

// Handle Back to Home button - Navigate to Career section
const backBtn = document.querySelector('.back-btn');
if (backBtn) {
    backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.history.back();
    });
}

// Optional: Track button clicks (untuk analytics)
const downloadBtn = document.querySelector('.btn-primary');
const openTabBtn = document.querySelector('.btn-secondary');

if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
        console.log('Download button clicked');
        // Bisa tambahkan Google Analytics tracking di sini
    });
}

if (openTabBtn) {
    openTabBtn.addEventListener('click', function() {
        console.log('Open in new tab button clicked');
        // Bisa tambahkan Google Analytics tracking di sini
    });
}