// const cardCrypto = require('./cardCrypto');


const app = {

    base_URL: 'https://api.coingecko.com/api/v3',
    modal_URL: 'http://localhost:4700',

    init: async () => {

        cardModule.setBaseUrl(app.base_URL);

        modalsHome.setBaseUrl(app.modal_URL);
        
        navbarChange.setBaseUrl(app.modal_URL);

        app.showTemplateHome();

        await app.getCryptoFromAPI();

        app.addListenerToActions();

    },

    addListenerToActions: () => {

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

        for (const close of btnClose) {
            close.addEventListener('click', modalsHome.hideModal);
        };

        for (const cancel of btnCancel) {
            cancel.addEventListener('click', modalsHome.hideModal);
        };

        modalRegistration.addEventListener('click', modalsHome.showModal);
        modalConnect.addEventListener('click', modalsHome.showModal);
        btnModalRegistration.addEventListener('submit', modalsHome.checkRegister);
        btnModalConnect.addEventListener('submit', modalsHome.checkLogin);
        logout.addEventListener('click', navbarChange.afterLogOut);
        document.querySelector('.overlayFormNotValid').addEventListener('mouseenter', modalsHome.overlayErrorHidden);
    },

    getCryptoFromAPI: async () => {
        try {
            const result = await fetch(`${app.base_URL}/coins/markets?vs_currency=usd&sparkline=true`, {
                method: 'GET',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
            });

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