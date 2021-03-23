const navbarChange = {

    modal_URL: null,
    
    setBaseUrl: url => {

        navbarChange.modal_URL = url;
    },

    changeNavbarAfterConnexion: () => {

        const liConnexion = document.querySelector('.navbar_connexionLi');
        const liEnregistrement = document.querySelector('.navbar_enregistrementLi');
        const dashboard = document.querySelector('.navbar_dashboard');
        const logout = document.querySelector('.navbar_logout');

        liEnregistrement.style.display = 'none';
        liConnexion.style.display = 'none';
        dashboard.style.display = 'block';
        logout.style.display = 'block';
    },

    afterLogOut: () => {
       
        const dashboard = document.querySelector('.navbar_dashboard');
        const logout = document.querySelector('.navbar_logout');
        const liConnexion = document.querySelector('.navbar_connexionLi');
        const liEnregistrement = document.querySelector('.navbar_enregistrementLi');

        logout.style.display = 'none';
        dashboard.style.display = 'none';
        liConnexion.style.display = 'block';
        liEnregistrement.style.display = 'block';
    },
};