// Typewriter Effect dengan Looping
const nameElement = document.querySelector('.intro-text h1');
const descElement = document.querySelector('.intro-text p');

const nameText = "Arnolt";
const descText = "I'm currently studying at SMK Telkom Purwokerto majoring in Software Engineering";

let nameIndex = 0;
let descIndex = 0;

function typeName() {
    if (nameIndex < nameText.length) {
        nameElement.textContent = nameText.substring(0, nameIndex + 1);
        nameIndex++;
        setTimeout(typeName, 150); // Kecepatan ketik nama
    } else {
        // Setelah nama selesai, hapus cursor dan mulai deskripsi
        setTimeout(() => {
            nameElement.classList.remove('typewriter');
            descElement.classList.add('typewriter');
            typeDesc();
        }, 300);
    }
}

function typeDesc() {
    if (descIndex < descText.length) {
        descElement.textContent = descText.substring(0, descIndex + 1);
        descIndex++;
        setTimeout(typeDesc, 50); // Kecepatan ketik deskripsi
    } else {
        // CURSOR TETAP KEDAP-KEDIP selama 5 detik
        setTimeout(() => {
            // Baru hapus cursor sebelum proses delete
            descElement.classList.remove('typewriter');
            deleteText();
        }, 5000); // Jeda 5 detik dengan cursor tetap kedap-kedip
    }
}

function deleteText() {
    // Hapus teks deskripsi dulu
    let currentDescText = descElement.textContent;
    
    function deleteDesc() {
        if (currentDescText.length > 0) {
            currentDescText = currentDescText.slice(0, -1);
            descElement.textContent = currentDescText;
            setTimeout(deleteDesc, 20); // Kecepatan hapus
        } else {
            // Setelah deskripsi terhapus, hapus nama
            deleteName();
        }
    }
    
    function deleteName() {
        let currentNameText = nameElement.textContent;
        
        function deleteNameChar() {
            if (currentNameText.length > 0) {
                currentNameText = currentNameText.slice(0, -1);
                nameElement.textContent = currentNameText;
                setTimeout(deleteNameChar, 100); // Kecepatan hapus nama
            } else {
                // Reset index dan mulai lagi
                nameIndex = 0;
                descIndex = 0;
                
                setTimeout(() => {
                    nameElement.classList.add('typewriter');
                    typeName();
                }, 500);
            }
        }
        deleteNameChar();
    }
    
    deleteDesc();
}

// Mulai animasi typewriter saat halaman load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Kosongkan teks dulu
    nameElement.textContent = '';
    descElement.textContent = '';
    
    // Mulai dengan nama setelah delay
    setTimeout(() => {
        nameElement.classList.add('typewriter');
        typeName();
    }, 500);
});