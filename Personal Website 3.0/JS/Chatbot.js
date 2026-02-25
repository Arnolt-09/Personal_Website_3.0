// ====================================
// KONFIGURASI FAQ - EDIT DI SINI!
// ====================================

// Sistem Bilingual: Keyword Indo | English
const FAQ_DATA = {
    // Language Switch / Bahasa
    "bisa bahasa indonesia|bahasa indonesia|indonesia|indo|berbahasa indonesia|kamu bisa indo|speak indonesian|do you speak indonesian": {
        id: "Ya, tentu! Saya bisa berbahasa Indonesia. 😊\n\nSekarang saya akan menjawab dalam bahasa Indonesia. Ada yang bisa saya bantu?",
        en: "Yes, of course! I can speak Indonesian. 😊\n\nNow I'll answer in Indonesian. How can I help you?",
        suggestions_id: ["Tentang", "Keahlian", "Portfolio", "Kontak"],
        suggestions_en: ["About", "Skills", "Portfolio", "Contact"],
        forceLanguage: 'id'
    },
    "can you speak english|english please|speak english|english|switch to english|bahasa inggris": {
        id: "Yes! I'll switch to English now. How can I help you?",
        en: "Yes! I'll switch to English now. How can I help you?",
        suggestions_id: ["About", "Skills", "Portfolio", "Contact"],
        suggestions_en: ["About", "Skills", "Portfolio", "Contact"],
        forceLanguage: 'en'
    },
    
    // Tentang Diri / About
    "siapa kamu|siapa nama|nama kamu|nama lu|siapa anda|siapa elo|nama|who are you|what is your name|your name|who is this|about you": {
        id: "Halo! Saya adalah FAQ Assistant. Saya di sini untuk membantu menjawab pertanyaan tentang Arnolt, portfolio, dan layanan yang ditawarkan. Ada yang bisa saya bantu?",
        en: "Hello! I am FAQ Assistant. I'm here to help answer questions about Arnolt, portfolio, and services offered. How can I help you?",
        suggestions_id: ["Keahlian apa saja?", "Portfolio", "Kontak"],
        suggestions_en: ["What skills?", "Portfolio", "Contact"]
    },
    "tentang|profil|biodata|bio|profile|about|introduction|introduce|about arnolt|siapa arnolt": {
        id: "Arnolt Arfa Nugraha, adalah seorang siswa SMK Telkom program keahlian Rekayasa Perangkat Lunak (RPL) yang berfokus pada pengembangan aplikasi, website, dan game. Memiliki pengalaman dalam membangun proyek seperti sistem kasir berbasis C#, website toko online, serta game 2D menggunakan Unity.",
        en: "Arnolt Arfa Nugraha is a student at SMK Telkom majoring in Software Engineering (RPL), focusing on application, website, and game development. Has experience building projects such as C#-based cashier systems, online store websites, and 2D games using Unity.",
        suggestions_id: ["Pengalaman kerja", "Keahlian", "Portfolio"],
        suggestions_en: ["Work experience", "Skills", "Portfolio"]
    },
    
    // Keahlian & Skills
    "keahlian|skill|kemampuan|bisa apa|expertise|apa yang bisa|what can you do|skills|abilities|capabilities|what are you good at": {
        id: "Keahlian saya meliputi:\n\n• Web Development (HTML, CSS, JavaScript, React)\n• UI/UX Design (Figma)\n• Digital Marketing (Davinci, Capcut, Social Media)\n• Project Management\n\nSemua skill ini terus saya kembangkan untuk memberikan hasil terbaik.",
        en: "My skills include:\n\n• Web Development (HTML, CSS, JavaScript, React)\n• UI/UX Design (Figma)\n• Digital Marketing (Davinci, Capcut, Social Media)\n• Project Management\n\nI continuously develop these skills to deliver the best results.",
        suggestions_id: ["Portfolio", "Pengalaman", "Teknologi"],
        suggestions_en: ["Portfolio", "Experience", "Technology"]
    },
    "teknologi|tech stack|tools|software|framework|bahasa pemrograman|technology|programming language|what tech|what tools": {
        id: "Teknologi yang saya gunakan:\n\n• Frontend: HTML, CSS, JS\n• Backend: Python\n• Database: MySQL, MongoDB\n• Game/System Developer: C#, C++\n• Framework: Laravel, .NET\n• Tools: GitHub, PHP MyAdmin, Laragon\n• Design: Figma",
        en: "Technologies I use:\n\n• Frontend: HTML, CSS, JS\n• Backend: Python\n• Database: MySQL, MongoDB\n• Game/System Developer: C#, C++\n• Framework: Laravel, .NET\n• Tools: GitHub, PHP MyAdmin, Laragon\n• Design: Figma",
        suggestions_id: ["Keahlian", "Portfolio", "Layanan"],
        suggestions_en: ["Skills", "Portfolio", "Services"]
    },

    // Portfolio & Pengalaman
    "portfolio|portofolio|dia ngapain aja kerjanya|project|karya|hasil kerja|pekerjaan|projects|work|previous work|past projects|what projects": {
        id: "Beberapa project yang telah saya kerjakan:\n\n1. Website Development\n2. 2D Game Unity\n3. Mobile App\n4. Figma Design\n5. Video Editing\n\nIngin melihat detail project tertentu?",
        en: "Some projects I've worked on:\n\n1. Website Development\n2. 2D Game Unity\n3. Mobile App\n4. Figma Design\n5. Video Editing\n\nWould you like to see specific project details?",
        suggestions_id: ["Pengalaman kerja", "Kontak", "Layanan"],
        suggestions_en: ["Work experience", "Contact", "Services"]
    },
    "pengalaman|experience|kerja dimana|pernah kerja|riwayat|work experience|employment history|where did you work|background": {
        id: "Saat ini saya belum memiliki pengalaman kerja profesional karena masih berstatus sebagai siswa. Namun, saya telah mengerjakan beberapa proyek pengembangan aplikasi dan website sebagai bagian dari pembelajaran dan pengembangan keterampilan pribadi. Melalui proyek tersebut, saya terbiasa bekerja dengan C#, HTML, CSS, JavaScript, PHP/Laravel, serta memahami dasar pengelolaan database.",
        en: "Currently I don't have professional work experience as I am still a student. However, I have worked on several application and website development projects as part of my learning and personal skill development. Through these projects, I am familiar with working in C#, HTML, CSS, JavaScript, PHP/Laravel, and understand the basics of database management.",
        suggestions_id: ["Portfolio", "Keahlian", "Layanan"],
        suggestions_en: ["Portfolio", "Skills", "Services"]
    },

    // Layanan & Pricing
    "layanan|service|jasa|menawarkan apa|bisa bantu apa|offering|services|what do you offer|what can you help with": {
        id: "Layanan yang saya tawarkan:\n\n• Website Development (Landing page, E-commerce, Corporate)\n• UI/UX Design\n• Konsultasi Digital Marketing\n• Maintenance & Support\n\nSetiap project disesuaikan dengan kebutuhan klien.",
        en: "Services I offer:\n\n• Website Development (Landing page, E-commerce, Corporate)\n• UI/UX Design\n• Digital Marketing Consulting\n• Maintenance & Support\n\nEach project is customized to client needs.",
        suggestions_id: ["Portfolio", "Kontak"],
        suggestions_en: ["Portfolio", "Contact"]
    },

    // Kontak & Informasi
    "kontak|hubungi|contact|alamat|reach|how to contact|get in touch|reach you": {
        id: "Hubungi saya melalui:\n\n📧 Email: arnoltarfanugraha@gmail.com\n📱 WhatsApp: +62 857-4723-0889\n💼 LinkedIn: www.linkedin.com/in/arnolt-arfa-nugraha-7451a8348\n\nSaya biasanya merespon dalam 1-2 jam di jam kerja! Kamu Mau Kontak Langsung?",
        en: "Contact me via:\n\n📧 Email: arnoltarfanugraha@gmail.com\n📱 WhatsApp: +62 857-4723-0889\n💼 LinkedIn: www.linkedin.com/in/arnolt-arfa-nugraha-7451a8348\n\nI usually respond within 1-2 hours during work hours! Want to contact directly?",
        suggestions_id: ["Cara Kontak", "Layanan"],
        suggestions_en: ["How to contact", "Services"]
    },
    "cara kontak|gimana kontak|kontak langsung|how to reach|direct contact": {
        id: "Untuk menghubungi saya, silakan klik tombol 'Let's Talk' berwarna biru di pojok kanan atas. Tombol tersebut akan mengarahkan Anda langsung ke email saya.",
        en: "To contact me, please click the blue 'Let's Talk' button in the top right corner. That button will direct you straight to my email.",
        suggestions_id: ["WhatsApp", "Email", "Layanan"],
        suggestions_en: ["WhatsApp", "Email", "Services"]
    },
    "whatsapp|wa|chat|telepon|phone|nomor|number": {
        id: "WhatsApp: +62 857-4723-0889\n\nLebih suka chat langsung? Hubungi saya via WhatsApp untuk respon yang lebih cepat!",
        en: "WhatsApp: +62 857-4723-0889\n\nPrefer direct chat? Contact me via WhatsApp for faster response!",
        suggestions_id: ["Email", "Kontak", "Layanan"],
        suggestions_en: ["Email", "Contact", "Services"]
    },
    "email|mail|surel": {
        id: "Email saya: arnoltarfanugraha@gmail.com\n\nSilakan kirim detail project Anda, dan saya akan segera merespon!",
        en: "My email: arnoltarfanugraha@gmail.com\n\nPlease send your project details, and I'll respond promptly!",
        suggestions_id: ["WhatsApp", "Kontak", "Layanan"],
        suggestions_en: ["WhatsApp", "Contact", "Services"]
    },

    // Default responses
    "halo|hai|hi|hello|hey|hola|good morning|good afternoon|good evening": {
        id: "Halo! 👋 Senang bertemu dengan Anda! Ada yang bisa saya bantu hari ini?",
        en: "Hello! 👋 Nice to meet you! How can I help you today?",
        suggestions_id: ["Tentang", "Layanan", "Portfolio"],
        suggestions_en: ["About", "Services", "Portfolio"]
    },
    "terima kasih|thanks|makasih|thank you|thx|terima|thanks a lot|appreciate": {
        id: "Sama-sama! Senang bisa membantu. Jangan ragu untuk bertanya lagi jika ada yang perlu dibantu! 😊",
        en: "You're welcome! Happy to help. Don't hesitate to ask again if you need anything! 😊",
        suggestions_id: ["Kontak", "Layanan", "Portfolio"],
        suggestions_en: ["Contact", "Services", "Portfolio"]
    },
    "selamat pagi|pagi": {
        id: "Selamat pagi! ☀️ Semoga harimu menyenangkan! Ada yang bisa saya bantu?",
        en: "Good morning! ☀️ Have a great day! How can I help you?",
        suggestions_id: ["Tentang", "Layanan", "Portfolio"],
        suggestions_en: ["About", "Services", "Portfolio"]
    },
    "selamat siang|siang": {
        id: "Selamat siang! 🌤️ Ada yang bisa saya bantu hari ini?",
        en: "Good afternoon! 🌤️ How can I help you today?",
        suggestions_id: ["Tentang", "Layanan", "Portfolio"],
        suggestions_en: ["About", "Services", "Portfolio"]
    },
    "selamat malam|malam": {
        id: "Selamat malam! 🌙 Ada yang bisa saya bantu malam ini?",
        en: "Good evening! 🌙 How can I help you tonight?",
        suggestions_id: ["Tentang", "Layanan", "Portfolio"],
        suggestions_en: ["About", "Services", "Portfolio"]
    }
};

// Quick replies
const INITIAL_QUICK_REPLIES_EN = ["About", "Skills", "Portfolio", "Contact"];
const INITIAL_QUICK_REPLIES_ID = ["Tentang", "Keahlian", "Portfolio", "Kontak"];

// ====================================
// CHATBOT CLASS - CLEAN & SIMPLE
// ====================================

class Chatbot {
    constructor() {
        // Elements
        this.chatToggle = document.getElementById('chatbotToggle');
        this.chatContainer = document.getElementById('chatbotContainer');
        this.closeChat = document.getElementById('chatbotCloseChat');
        this.chatMessages = document.getElementById('chatbotMessages');
        this.messageInput = document.getElementById('chatbotMessageInput');
        this.sendBtn = document.getElementById('chatbotSendBtn');
        this.clearBtn = document.getElementById('chatbotClearBtn'); // AMBIL DARI HTML
        this.typingIndicator = document.getElementById('chatbotTypingIndicator');
        this.quickReplies = document.getElementById('chatbotQuickReplies');
        this.quickReplyButtons = document.getElementById('chatbotQuickReplyButtons');

        // Load saved state
        this.loadState();
        this.init();
    }

    init() {
        // Event listeners
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        this.closeChat.addEventListener('click', () => this.toggleChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // CLEAR BUTTON EVENT - LANGSUNG DARI HTML!
        if (this.clearBtn) {
            this.clearBtn.addEventListener('click', () => this.clearHistory());
        }

        // Restore chat history
        this.restoreChatHistory();

        // Show welcome if no history
        if (this.messageHistory.length === 0) {
            this.showWelcomeMessage();
        }

        // Update clear button visibility
        this.updateClearButtonVisibility();
    }

    // ========== LOCALSTORAGE ==========
    
    loadState() {
        try {
            const savedState = localStorage.getItem('chatbotState');
            if (savedState) {
                const state = JSON.parse(savedState);
                this.isOpen = state.isOpen || false;
                this.messageHistory = state.messageHistory || [];
                this.preferredLanguage = state.preferredLanguage || 'en';
            } else {
                this.isOpen = false;
                this.messageHistory = [];
                this.preferredLanguage = 'en';
            }
        } catch (error) {
            console.error('Error loading state:', error);
            this.isOpen = false;
            this.messageHistory = [];
            this.preferredLanguage = 'en';
        }
    }

    saveState() {
        try {
            const state = {
                isOpen: this.isOpen,
                messageHistory: this.messageHistory,
                preferredLanguage: this.preferredLanguage
            };
            localStorage.setItem('chatbotState', JSON.stringify(state));
        } catch (error) {
            console.error('Error saving state:', error);
        }
    }

    restoreChatHistory() {
        this.chatMessages.innerHTML = '';
        this.messageHistory.forEach(message => {
            this.addMessageToDOM(message);
        });
        this.scrollToBottom();
    }

    clearHistory() {
        const confirmText = this.preferredLanguage === 'id' 
            ? 'Hapus semua riwayat chat?' 
            : 'Clear all chat history?';
            
        if (confirm(confirmText)) {
            this.messageHistory = [];
            this.chatMessages.innerHTML = '';
            this.preferredLanguage = 'en';
            this.saveState();
            this.showWelcomeMessage();
            this.updateClearButtonVisibility();
        }
    }

    updateClearButtonVisibility() {
        if (this.clearBtn) {
            // Hide button if no chat history (optional)
            if (this.messageHistory.length <= 1) {
                this.clearBtn.classList.add('hidden');
            } else {
                this.clearBtn.classList.remove('hidden');
            }
        }
    }

    // ========== CHAT FUNCTIONS ==========

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.chatContainer.classList.toggle('chatbot-active');
        
        if (this.isOpen) {
            this.messageInput.focus();
        }
        this.saveState();
    }

    showWelcomeMessage() {
        const welcomeMsg = {
            type: 'bot',
            text: 'Hello! 👋 I\'m T-Rex, Arnolt\'s assistant. I\'m here to help answer your questions about Arnolt\'s portfolio and services.\n\nPlease choose a topic or type your question!',
            time: this.getCurrentTime()
        };
        this.addMessage(welcomeMsg);
        this.showQuickReplies(INITIAL_QUICK_REPLIES_EN);
    }

    detectLanguage(text) {
        const englishWords = ['the', 'is', 'are', 'was', 'were', 'what', 'who', 'where', 'when', 'how', 'can', 'could', 'would', 'your', 'you', 'about', 'me', 'tell', 'show'];
        const indonesianWords = ['yang', 'dan', 'di', 'ke', 'dari', 'untuk', 'dengan', 'adalah', 'ini', 'itu', 'apa', 'siapa', 'dimana', 'kapan', 'bagaimana', 'bisa', 'kamu', 'anda'];
        
        const words = text.toLowerCase().split(/\s+/);
        let enCount = 0;
        let idCount = 0;
        
        words.forEach(word => {
            if (englishWords.includes(word)) enCount++;
            if (indonesianWords.includes(word)) idCount++;
        });
        
        return enCount > idCount ? 'en' : 'id';
    }

    sendMessage() {
        const text = this.messageInput.value.trim();
        if (!text) return;

        const userMsg = {
            type: 'user',
            text: text,
            time: this.getCurrentTime()
        };
        this.addMessage(userMsg);
        this.messageInput.value = '';
        this.showTyping();

        setTimeout(() => {
            this.hideTyping();
            const response = this.getBotResponse(text);
            const botMsg = {
                type: 'bot',
                text: response.answer,
                time: this.getCurrentTime()
            };
            this.addMessage(botMsg);

            if (response.suggestions) {
                this.showQuickReplies(response.suggestions);
            }

            this.saveState();
            this.updateClearButtonVisibility();
        }, 1000 + Math.random() * 1000);
    }

    getBotResponse(userInput) {
        const input = userInput.toLowerCase().trim();
        const detectedLang = this.detectLanguage(input);
        const cleanInput = input.replace(/\b(bisa|tolong|dong|sih|ya|nih|nya|kan|lah|kah|please|can|could|would)\b/g, '').trim();

        for (const [keyPattern, value] of Object.entries(FAQ_DATA)) {
            const keywords = keyPattern.split('|');
            
            for (const keyword of keywords) {
                const cleanKeyword = keyword.trim();
                
                if (cleanInput.includes(cleanKeyword) || input.includes(cleanKeyword)) {
                    if (value.forceLanguage) {
                        this.preferredLanguage = value.forceLanguage;
                    } else {
                        this.preferredLanguage = detectedLang;
                    }
                    
                    const langToUse = value.forceLanguage || this.preferredLanguage;
                    
                    return {
                        answer: langToUse === 'en' ? (value.en || value.id) : value.id,
                        suggestions: langToUse === 'en' ? (value.suggestions_en || value.suggestions_id) : value.suggestions_id
                    };
                }
                
                // Fuzzy match
                const inputWords = cleanInput.split(/\s+/);
                const keywordWords = cleanKeyword.split(/\s+/);
                let matchCount = 0;
                
                for (const word of inputWords) {
                    if (word.length > 2) {
                        for (const kw of keywordWords) {
                            if (kw.length > 2 && (word.includes(kw) || kw.includes(word))) {
                                matchCount++;
                            }
                        }
                    }
                }
                
                if (matchCount > 0 && matchCount >= keywordWords.length * 0.6) {
                    if (value.forceLanguage) {
                        this.preferredLanguage = value.forceLanguage;
                    } else {
                        this.preferredLanguage = detectedLang;
                    }
                    
                    const langToUse = value.forceLanguage || this.preferredLanguage;
                    
                    return {
                        answer: langToUse === 'en' ? (value.en || value.id) : value.id,
                        suggestions: langToUse === 'en' ? (value.suggestions_en || value.suggestions_id) : value.suggestions_id
                    };
                }
            }
        }

        this.preferredLanguage = detectedLang;
        const defaultResponse = {
            id: "Maaf, saya belum mengerti pertanyaan Anda. Bisa tolong dijelaskan lebih detail? Atau pilih salah satu topik di bawah ini:",
            en: "Sorry, I don't understand your question yet. Could you please explain in more detail? Or choose one of the topics below:"
        };
        
        return {
            answer: this.preferredLanguage === 'en' ? defaultResponse.en : defaultResponse.id,
            suggestions: this.preferredLanguage === 'en' ? INITIAL_QUICK_REPLIES_EN : INITIAL_QUICK_REPLIES_ID
        };
    }

    addMessage(message) {
        this.messageHistory.push(message);
        this.addMessageToDOM(message);
        this.saveState();
    }

    addMessageToDOM(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message chatbot-${message.type}`;

        if (message.type === 'bot') {
            messageDiv.innerHTML = `
                <div class="chatbot-message-avatar">🦖</div>
                <div class="chatbot-message-content">
                    <div class="chatbot-message-bubble">
                        <p class="chatbot-message-text">${this.formatText(message.text)}</p>
                        <div class="chatbot-message-time">${message.time}</div>
                    </div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="chatbot-message-content">
                    <div class="chatbot-message-bubble">
                        <p class="chatbot-message-text">${this.formatText(message.text)}</p>
                        <div class="chatbot-message-time">${message.time}</div>
                    </div>
                </div>
            `;
        }

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    formatText(text) {
        return text.replace(/\n/g, '<br>');
    }

    showQuickReplies(suggestions) {
        this.quickReplyButtons.innerHTML = '';
        suggestions.forEach(suggestion => {
            const btn = document.createElement('button');
            btn.className = 'chatbot-quick-reply-btn';
            btn.textContent = suggestion;
            btn.addEventListener('click', () => {
                this.messageInput.value = suggestion;
                this.sendMessage();
            });
            this.quickReplyButtons.appendChild(btn);
        });
    }

    showTyping() {
        this.typingIndicator.classList.add('chatbot-active');
        this.scrollToBottom();
    }

    hideTyping() {
        this.typingIndicator.classList.remove('chatbot-active');
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});