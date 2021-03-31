const navbarChange = {

    modal_URL: null,
    
    setBaseUrl: url => {

        navbarChange.modal_URL = url;
    },

    changeNavbar: () => {

        const liConnexion = document.querySelector('.navbar_connexionLi');
        const liEnregistrement = document.querySelector('.navbar_enregistrementLi');
        const dashboard = document.querySelector('.navbar_dashboard');
        const logout = document.querySelector('.navbar_logout');
        // Changement de la navbar de CONNEXION ENREGISTREMENT à DASHBOARD DECONNEXION
        if (liEnregistrement.style.display === 'none') {
            liEnregistrement.style.display = 'block';
            liConnexion.style.display = 'block';
            dashboard.style.display = 'none';
            logout.style.display = 'none';
        } else {
            liEnregistrement.style.display = 'none';
            liConnexion.style.display = 'none';
            dashboard.style.display = 'block';
            logout.style.display = 'block';
        };
    },
    // Modale page dashboard en construction
    pageDashboardBuild: (event) => {
        console.log(event.target)
        const modalBuild = document.querySelector('#modalBuild');
        console.log(modalBuild)
        if (modalBuild.style.display === 'none' || modalBuild.style.display === '') {

            modalBuild.style.display = 'block';
        } else {
            modalBuild.style.display = 'none'
        }
    }
};