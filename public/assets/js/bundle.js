(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// const cardCrypto = require('./cardCrypto');


const app = {

    base_URL: 'https://api.coingecko.com/api/v3',
    modal_URL: 'http://localhost:4800',

    init: async () => {

        cardModule.setBaseUrl(app.base_URL);

        modalsHome.setBaseUrl(app.modal_URL);

        app.showTemplateHome();

        await app.getCryptoFromAPI();

        app.addListenerToActions();
    },

    addListenerToActions: () => {

        const cards = document.querySelectorAll('.container_card');
        const modalRegistration = document.querySelector('.navbar_connexion');
        const modalConnect = document.querySelector('.navbar_enregistrement');
        const btnClose = document.querySelectorAll('.close');
        const btnCancel = document.querySelectorAll('.btn_cancel');

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
},{}]},{},[1]);
