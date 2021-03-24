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

    checkRegister: async (event) => {

        event.preventDefault();

        const formData = new FormData(event.target);

        const data = [];

        for (let pair of formData.entries()) {
            data.push(pair[1]); 
        };

        try {
            const result = await fetch(`${modalsHome.modal_URL}/enregistrement`, {
                method: 'POST',
                body: formData
            });

            const json = await result.json();
            const checkRegisterIsValid = modalsHome.checkRegisterIsValid(data, json);

            if (result.ok && checkRegisterIsValid) {

                const disappearValidAfterTime = setTimeout(() => {event.target.closest('.modal').style.display = 'none'}, 500);  
                clearTimeout(disappearValidAfterTime); 

            } else {
                console.error('On a eu un pépin sur le serveur');
            }

        } catch (error) {

            console.error('Impossible d\'ajouter le nouvel utilisateur en base de donnée.', error);
        }

    },

    checkRegisterIsValid: (data, json) => {

        const emailReg = new RegExp(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i);
        const emailValidOrNot = emailReg.test(data[0]);
        const overlayForm = document.querySelector('.overlayFormNotValid');
        const password1 = data[2];
        const password2 = data[3];

        if (json === 'Champ email invalide ou utilisé et/ou pseudonyme déjà utilisé' || emailValidOrNot === false || json === 'Pseudonyme/email déjà utilisé et/ou mot de passe inférieur à 8 caractères') {

            overlayForm.textContent = `${json}`;
            overlayForm.style.display = 'block';
            overlayForm.style.border = 'red 1px solid';

        } else {

            if (password1.length < 8 || password1 !== password2) {

                overlayForm.textContent = 'Mot de passe incorrect';
                overlayForm.style.border = 'red 1px solid';
                overlayForm.style.display = 'block';
            } else {

                overlayForm.textContent = 'Vous êtes bien enregistré !';
                overlayForm.style.border = 'green 1px solid';
                overlayForm.style.display = 'block';

                return true;
            };
        };
    },

    overlayErrorHidden: (event) => {

        event.target.style.display = 'none';
    },

    checkLogin: async (event) => {

        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const result = await fetch(`${modalsHome.modal_URL}/connexion`, {
                method: 'POST',
                body: formData
            });

            if (result.ok) {

                event.target.closest('.modal').style.display = 'none';
                navbarChange.changeNavbarAfterConnexion();

            } else {

                document.querySelector('.overlayAuthNotValid').style.display = 'block';
            };

        } catch (error) {

            console.error('Impossible de vérifier si l\'utilisateur est en base de donnée.', error);
        }
    },
}