const {User} = require('../models');
const bcrypt = require('bcrypt');

const loginController = {

    checkPasswordForEnter: async (req, res, next) => {

        try {
            const email = req.body.email1;
            const password = req.body.password1;
            const checkMembersInDb = await User.findOne({ where: {email: `${email}`}});

            if (!checkMembersInDb) {

                res.status(500).send("Nom d'utilisateur ou mot de passe inconnu ..."); 
            };

            const checkPassword = bcrypt.compareSync(password, checkMembersInDb.password);

            if (!checkPassword) {
                next();
            };

            //l'utilisateur est connecté, on stocke les infos utiles en session
            req.session.user = {
                pseudo: checkMembersInDb.pseudonyme,
                email: checkMembersInDb.email,
                role: checkMembersInDb.role
            };

            await User.update({status: 1},
                        {where: {email: email}}
            );

            res.json(checkMembersInDb);

        } catch (error) {
            res.status(500).send('On a eu un pépin', error);
        };
    },

};

module.exports = loginController;