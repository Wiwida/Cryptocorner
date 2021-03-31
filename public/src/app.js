// const cardCrypto = require('./cardCrypto');

// Application :

const app = {

    // URL pour les appels à l'API CoinGecko
    base_URL: 'https://api.coingecko.com/api/v3',
    // URL pour la gestion en BDD
    modal_URL: 'http://localhost:4700',

    init: async () => {
        // Initialisation de la fonction avec attribution des URL
        cardModule.setBaseUrl(app.base_URL);

        modalsHome.setBaseUrl(app.modal_URL);
        
        navbarChange.setBaseUrl(app.modal_URL);
        // Page accueil 
        app.showTemplateHome();
        // Pour le chargement des crypto
        await app.getCryptoFromAPI();

        app.addListenerToActions();

    },

    addListenerToActions: () => {
        // Section eventListener
        const cards = document.querySelectorAll('.container_card');
        const modalRegistration = document.querySelector('.navbar_connexion');
        const modalConnect = document.querySelector('.navbar_enregistrement');
        const btnModalRegistration = document.querySelector('.formRegistration');
        const btnModalConnect = document.querySelector('.formLogin');
        const btnClose = document.querySelectorAll('.close');
        const btnCancel = document.querySelectorAll('.btn_cancel');
        const logout = document.querySelector('.navbar_logout');

        for (const card of cards) {
            card.addEventListener('click', cardModule.showChartAfterClick);
        };
        //Fermer les modales (btn close)
        for (const close of btnClose) {
            close.addEventListener('click', modalsHome.hideModal);
        };
        // Fermer les modales (btn cancel)
        for (const cancel of btnCancel) {
            cancel.addEventListener('click', modalsHome.hideModal);
        };

        modalRegistration.addEventListener('click', modalsHome.showModal);
        modalConnect.addEventListener('click', modalsHome.showModal);
        btnModalRegistration.addEventListener('submit', modalsHome.checkRegister);
        btnModalConnect.addEventListener('submit', modalsHome.checkLogin);
        logout.addEventListener('click', navbarChange.changeNavbar);
        document.querySelector('.overlayFormNotValid').addEventListener('mouseenter', modalsHome.overlayErrorHidden);
        document.querySelector('.overlayAuthNotValid').addEventListener('mouseenter', modalsHome.overlayErrorHidden);
        document.querySelector('.navbar_dashboard').addEventListener('click', navbarChange.pageDashboardBuild);
    },

    getCryptoFromAPI: async () => {
        // On va chercher les données relatives aux cryptos dans l'api CoinGecko)
        try {
            const result = await fetch(`${app.base_URL}/coins/markets?vs_currency=usd&sparkline=true`, {
                method: 'GET',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
            });
            // Si c'est OK on affiche et on génère les 'cards' crypto
            if (result.ok) {
                const json = await result.json();
                
                for (const crypto of json) {
                    cardModule.makeCardFromApiInDOM(crypto);
                };
            }

        } catch (error) {

            console.error('Impossible de charger les listes depuis l\'API', error);
        }
    },

    showTemplateHome: () => {
        //Affichage de la page home avec la template correspondante
        const containerCrypto = document.getElementById('container_crypto');
        const template = document.getElementById('home');
        const node = document.importNode(template.content, true);

        if (containerCrypto.before() === undefined) {
            containerCrypto.before(node);
        } else {
            console.log('Le contenu est déjà là !');
        };

    },

}

document.addEventListener('DOMContentLoaded', app.init);