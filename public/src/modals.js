const modalsHome = {

    modal_URL: null,
    
    setBaseUrl: url => {
        modalsHome.modal_URL = url;
    },

    showModal: (event) => {

        const modalRegistration = document.getElementById('modalRegistration');
        const modalConnect = document.getElementById('modalConnect');
        const linkConnect = document.querySelector('.navbar_connexion');
        const linkRegistration = document.querySelector('.navbar_enregistrement');
        
        if (event.target === linkRegistration) {
            modalRegistration.style.display = 'block';  
        } else {
            modalConnect.style.display = 'block';
        }
    },

    hideModal: (event) => {

        event.target.closest('.modal').style.display = 'none';
    },
}