/* ========================================
   PORTFOLIO - JAVASCRIPT
   Gestion des interactions et du formulaire
======================================== */

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // NAVIGATION FLUIDE
    // ========================================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // GESTION DU FORMULAIRE DE CONTACT
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formMessage = document.getElementById('formMessage');
            const submitBtn = this.querySelector('.submit-btn');
            
            // Désactiver le bouton pendant l'envoi
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Envoi en cours...</span>';
            
            // Récupérer les données du formulaire
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                country: document.getElementById('country').value,
                reason: document.getElementById('reason').value,
                message: document.getElementById('message').value
            };
            
            // Valider les données
            if (!validateForm(formData)) {
                formMessage.className = 'form-message error';
                formMessage.textContent = '✗ Veuillez remplir tous les champs correctement.';
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Envoyer le message</span><span class="btn-icon">→</span>';
                return;
            }
            
            // Simuler l'envoi (remplacez par votre vraie logique d'envoi)
            setTimeout(() => {
                // Afficher le message de succès
                formMessage.className = 'form-message success';
                formMessage.textContent = '✓ Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.';
                
                // Réinitialiser le formulaire
                contactForm.reset();
                
                // Réactiver le bouton
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Envoyer le message</span><span class="btn-icon">→</span>';
                
                // Masquer le message après 5 secondes
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 1000);
            
            /* 
            ========================================
            POUR CONNECTER À UN VRAI SERVICE D'EMAIL
            ========================================
            
            OPTION 1 - EmailJS (Gratuit, Recommandé)
            -----------------------------------------
            1. Visitez https://www.emailjs.com
            2. Créez un compte gratuit
            3. Configurez un service email (Gmail, Outlook, etc.)
            4. Créez un template d'email
            5. Ajoutez avant </body> dans index.html :
               <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
            6. Remplacez le setTimeout ci-dessus par :
            
            emailjs.init("VOTRE_PUBLIC_KEY"); // Récupérez votre clé sur emailjs.com
            
            emailjs.send("VOTRE_SERVICE_ID", "VOTRE_TEMPLATE_ID", {
                from_name: formData.name,
                from_email: formData.email,
                country: formData.country,
                reason: formData.reason,
                message: formData.message
            })
            .then(() => {
                formMessage.className = 'form-message success';
                formMessage.textContent = '✓ Message envoyé avec succès !';
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Envoyer le message</span><span class="btn-icon">→</span>';
            })
            .catch((error) => {
                console.error('Erreur:', error);
                formMessage.className = 'form-message error';
                formMessage.textContent = '✗ Erreur lors de l\'envoi. Réessayez.';
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Envoyer le message</span><span class="btn-icon">→</span>';
            });
            
            
            OPTION 2 - Formspree (Plus Simple)
            -----------------------------------
            1. Visitez https://formspree.io
            2. Créez un compte gratuit
            3. Dans index.html, modifiez la balise <form> :
               <form action="https://formspree.io/f/VOTRE_FORM_ID" method="POST" class="contact-form">
            4. Supprimez ce script de validation, Formspree gère tout
            
            
            OPTION 3 - Backend Personnel (Python/Flask)
            --------------------------------------------
            1. Créez un serveur Flask/FastAPI
            2. Exemple avec fetch :
            
            fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                formMessage.className = 'form-message success';
                formMessage.textContent = '✓ Message envoyé !';
                contactForm.reset();
            })
            .catch(error => {
                formMessage.className = 'form-message error';
                formMessage.textContent = '✗ Erreur d\'envoi.';
            });
            
            */
        });
    }

    // ========================================
    // FONCTION DE VALIDATION DU FORMULAIRE
    // ========================================
    function validateForm(data) {
        // Vérifier que tous les champs sont remplis
        if (!data.name || !data.email || !data.country || !data.reason || !data.message) {
            return false;
        }
        
        // Valider le format de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return false;
        }
        
        // Vérifier que le message a au moins 10 caractères
        if (data.message.length < 10) {
            return false;
        }
        
        return true;
    }

    // ========================================
    // ANIMATION AU SCROLL (Optionnel)
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer toutes les sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // ========================================
    // HIGHLIGHT DU MENU ACTIF
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu a');

    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.style.background = '';
                    item.style.color = '#1e3c72';
                    
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                        item.style.color = 'white';
                    }
                });
            }
        });
    }

    // Écouter le scroll
    window.addEventListener('scroll', highlightNavigation);

    // ========================================
    // BOUTON RETOUR EN HAUT (Optionnel)
    // ========================================
    // Vous pouvez décommenter cette section si vous voulez un bouton "retour en haut"
    /*
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    */

    // ========================================
    // MESSAGE DE CONSOLE (Optionnel)
    // ========================================
    console.log('%c👋 Bienvenue sur mon portfolio !', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cCe portfolio a été créé avec HTML, CSS et JavaScript', 'color: #764ba2; font-size: 14px;');
});

// ========================================
// FONCTION UTILITAIRE : Copier Email
// ========================================
function copyEmail() {
    const email = 'votre.email@example.com'; // Remplacez par votre vrai email
    navigator.clipboard.writeText(email).then(() => {
        alert('Email copié dans le presse-papiers !');
    });
}

// Vous pouvez ajouter cette fonction à un bouton dans le HTML si vous voulez