// Script pour masquer le badge Webflow s'il est ajouté dynamiquement
(function() {
    'use strict';
    
    // Fonction pour masquer le badge Webflow
    function hideWebflowBadge() {
        // Sélecteurs possibles pour le badge Webflow
        const selectors = [
            '.w-webflow-badge',
            'a[href*="webflow.com"][class*="badge"]',
            '.webflow-badge',
            'a[href*="webflow.com"]:has-text("Made in Webflow")',
            'a[href*="webflow.com"]:has-text("Powered by Webflow")'
        ];
        
        selectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.style.display = 'none';
                    el.style.visibility = 'hidden';
                    el.style.opacity = '0';
                    el.style.position = 'absolute';
                    el.style.left = '-9999px';
                    // Supprimer complètement si possible
                    if (el.parentNode) {
                        el.parentNode.removeChild(el);
                    }
                });
            } catch (e) {
                // Ignorer les erreurs de sélecteur
            }
        });
        
        // Chercher aussi par texte
        const allLinks = document.querySelectorAll('a');
        allLinks.forEach(link => {
            const text = link.textContent || link.innerText || '';
            if ((text.includes('Made in Webflow') || text.includes('Powered by Webflow')) && 
                link.href && link.href.includes('webflow.com')) {
                link.style.display = 'none';
                link.style.visibility = 'hidden';
                if (link.parentNode) {
                    link.parentNode.removeChild(link);
                }
            }
        });
    }
    
    // Exécuter immédiatement
    hideWebflowBadge();
    
    // Observer les changements dans le DOM
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            hideWebflowBadge();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Exécuter après le chargement complet
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideWebflowBadge);
    } else {
        setTimeout(hideWebflowBadge, 100);
        setTimeout(hideWebflowBadge, 500);
        setTimeout(hideWebflowBadge, 1000);
    }
})();

