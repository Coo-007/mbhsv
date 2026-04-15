// ============================================
// AGRICHAIN TOGO - JAVASCRIPT PRINCIPAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialisation AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // Navigation scroll effect
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hero scroll indicator
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const contexteSection = document.getElementById('contexte');
            if (contexteSection) {
                window.scrollTo({
                    top: contexteSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Widget de vérification de lot
    const verifyBtn = document.getElementById('verifyBtn');
    const lotIdInput = document.getElementById('lotIdInput');
    const verificationResult = document.getElementById('verificationResult');
    
    // Base de données mock des lots (simulation blockchain)
    const mockLots = {
        'TG-CACAO-2026-042': {
            id: 'TG-CACAO-2026-042',
            producteur: 'Koffi Agbenowossi',
            cooperative: 'SCOOPS IKPA',
            region: 'Kpalimé, Région des Plateaux',
            gps: '7.0522° N, 0.6317° E',
            dateRecolte: '15 Mars 2026',
            poids: '65 kg',
            qualite: 'Premium',
            statutEUDR: 'CONFORME',
            certification: 'En cours Fairtrade',
            blockchainTx: '0x7d4e3...a9f2c',
            scoreConfiance: 98,
            parcelleVerified: 'Zone non-déforestée depuis 2000',
            historique: [
                { etape: 'Récolte', date: '15/03/2026', acteur: 'Koffi A.', lieu: 'Kpalimé' },
                { etape: 'Pesée coopérative', date: '18/03/2026', acteur: 'SCOOPS IKPA', lieu: 'Kpalimé' },
                { etape: 'Fermentation', date: '20/03/2026', acteur: 'Centre de fermentation', lieu: 'Litimé' },
                { etape: 'Export', date: '28/03/2026', acteur: 'Togo Export SA', lieu: 'Port de Lomé' }
            ]
        },
        'TG-CACAO-2026-128': {
            id: 'TG-CACAO-2026-128',
            producteur: 'Akossiwa Mensah',
            cooperative: 'FUPROCAT',
            region: 'Litimé, Région des Plateaux',
            gps: '7.1234° N, 0.7654° E',
            dateRecolte: '22 Février 2026',
            poids: '120 kg',
            qualite: 'Standard',
            statutEUDR: 'CONFORME',
            certification: 'Non certifié',
            blockchainTx: '0x3f8a2...b7e1d',
            scoreConfiance: 85,
            parcelleVerified: 'Zone non-déforestée depuis 2000',
            historique: [
                { etape: 'Récolte', date: '22/02/2026', acteur: 'Akossiwa M.', lieu: 'Litimé' },
                { etape: 'Pesée coopérative', date: '25/02/2026', acteur: 'FUPROCAT', lieu: 'Litimé' },
                { etape: 'Séchage', date: '28/02/2026', acteur: 'Centre de séchage', lieu: 'Kpalimé' }
            ]
        },
        'TG-CACAO-2026-007': {
            id: 'TG-CACAO-2026-007',
            producteur: 'Yao Amegnido',
            cooperative: 'CAFÉ-CACAO KAYAH',
            region: 'Kayah, Région des Plateaux',
            gps: '7.3456° N, 0.5432° E',
            dateRecolte: '5 Janvier 2026',
            poids: '85 kg',
            qualite: 'Bio Premium',
            statutEUDR: 'CONFORME',
            certification: 'Bio certifié',
            blockchainTx: '0x9c2b1...e4f8a',
            scoreConfiance: 100,
            parcelleVerified: 'Zone non-déforestée depuis 2000',
            historique: [
                { etape: 'Récolte', date: '05/01/2026', acteur: 'Yao A.', lieu: 'Kayah' },
                { etape: 'Pesée coopérative', date: '08/01/2026', acteur: 'CAFÉ-CACAO KAYAH', lieu: 'Kayah' },
                { etape: 'Certification Bio', date: '12/01/2026', acteur: 'Ecocert', lieu: 'Lomé' },
                { etape: 'Export', date: '20/01/2026', acteur: 'Bio Togo Export', lieu: 'Port de Lomé' }
            ]
        }
    };
    
    function verifyLot(lotId) {
        // Simulation d'appel blockchain
        return new Promise((resolve) => {
            setTimeout(() => {
                const lot = mockLots[lotId];
                if (lot) {
                    resolve({ success: true, data: lot });
                } else {
                    resolve({ success: false, message: 'Lot non trouvé sur la blockchain' });
                }
            }, 800);
        });
    }
    
    function displayVerificationResult(data) {
        const html = `
            <div class="result-success">
                <div class="result-header">
                    <span class="result-badge">
                        <i class="fas fa-check-circle"></i> CONFORME EUDR
                    </span>
                    <span class="result-badge" style="background: var(--or-togo); color: var(--cacao-dark);">
                        <i class="fas fa-star"></i> Score ${data.scoreConfiance}/100
                    </span>
                </div>
                
                <div class="result-details">
                    <div class="detail-item">
                        <span class="detail-label">ID Lot</span>
                        <span class="detail-value">${data.id}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Producteur</span>
                        <span class="detail-value">${data.producteur}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Coopérative</span>
                        <span class="detail-value">${data.cooperative}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Région</span>
                        <span class="detail-value">${data.region}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Coordonnées GPS</span>
                        <span class="detail-value">${data.gps}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Date de récolte</span>
                        <span class="detail-value">${data.dateRecolte}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Poids</span>
                        <span class="detail-value">${data.poids}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Qualité</span>
                        <span class="detail-value">${data.qualite}</span>
                    </div>
                    <div class="detail-item" style="grid-column: span 2;">
                        <span class="detail-label">Transaction Blockchain</span>
                        <span class="detail-value" style="font-family: monospace; font-size: 14px;">${data.blockchainTx}</span>
                    </div>
                </div>
                
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(92, 46, 20, 0.1);">
                    <span class="detail-label">Vérification satellite</span>
                    <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px;">
                        <i class="fas fa-satellite" style="color: var(--success);"></i>
                        <span style="color: var(--success); font-weight: 500;">${data.parcelleVerified}</span>
                    </div>
                </div>
                
                <div style="margin-top: 20px;">
                    <span class="detail-label">Historique de traçabilité</span>
                    <div style="margin-top: 12px;">
                        ${data.historique.map((h, index) => `
                            <div style="display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px dashed rgba(92, 46, 20, 0.05);">
                                <span style="min-width: 90px; font-size: 13px; color: var(--gray);">${h.date}</span>
                                <i class="fas fa-circle" style="font-size: 8px; color: var(--or-togo);"></i>
                                <span style="font-weight: 500;">${h.etape}</span>
                                <span style="color: var(--gray); margin-left: auto;">${h.acteur}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        verificationResult.innerHTML = html;
    }
    
    function displayError(message) {
        verificationResult.innerHTML = `
            <div class="result-placeholder" style="color: var(--danger);">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
            </div>
        `;
    }
    
    function displayLoading() {
        verificationResult.innerHTML = `
            <div class="result-placeholder">
                <i class="fas fa-spinner fa-spin"></i>
                <span>Vérification sur la blockchain Celo...</span>
            </div>
        `;
    }
    
    if (verifyBtn && lotIdInput) {
        verifyBtn.addEventListener('click', async function() {
            const lotId = lotIdInput.value.trim();
            
            if (!lotId) {
                displayError('Veuillez entrer un identifiant de lot');
                return;
            }
            
            displayLoading();
            
            try {
                const result = await verifyLot(lotId);
                
                if (result.success) {
                    displayVerificationResult(result.data);
                    
                    // Animation de succès
                    verifyBtn.innerHTML = '<i class="fas fa-check"></i> Vérifié !';
                    setTimeout(() => {
                        verifyBtn.innerHTML = '<i class="fas fa-search"></i> Vérifier sur Chaîne';
                    }, 2000);
                } else {
                    displayError(result.message);
                }
            } catch (error) {
                displayError('Erreur de connexion à la blockchain');
            }
        });
        
        // Vérification automatique avec l'ID par défaut au chargement
        setTimeout(() => {
            if (lotIdInput.value) {
                verifyBtn.click();
            }
        }, 500);
        
        // Support de la touche Entrée
        lotIdInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                verifyBtn.click();
            }
        });
    }
    
    // Compteur animé pour les statistiques
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            // Conserver les valeurs non numériques telles quelles
            if (text.includes('%') || text.includes('$') || text.includes('<')) {
                return;
            }
        });
    }
    
    // Observer pour lancer l'animation des nombres quand visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.hero-stats').forEach(el => observer.observe(el));
    
    // Effet de parallaxe sur le hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBg = document.querySelector('.hero-bg');
        
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Ajouter des IDs de lot en exemple dans le placeholder
    const examples = ['TG-CACAO-2026-042', 'TG-CACAO-2026-128', 'TG-CACAO-2026-007'];
    const inputField = document.getElementById('lotIdInput');
    
    if (inputField) {
        // Ajouter un petit texte d'aide avec les exemples
        const helpText = document.createElement('div');
        helpText.style.marginTop = '8px';
        helpText.style.fontSize = '12px';
        helpText.style.color = 'var(--gray)';
        helpText.innerHTML = `Exemples : ${examples.map(id => `<code style="cursor: pointer; background: rgba(212,160,86,0.1); padding: 2px 6px; border-radius: 4px;" onclick="document.getElementById('lotIdInput').value='${id}'; document.getElementById('verifyBtn').click();">${id}</code>`).join(' • ')}`;
        
        inputField.parentNode.appendChild(helpText);
    }
});

// Exposer la fonction pour les exemples cliquables
window.fillLotId = function(id) {
    const input = document.getElementById('lotIdInput');
    const btn = document.getElementById('verifyBtn');
    if (input && btn) {
        input.value = id;
        btn.click();
    }
};