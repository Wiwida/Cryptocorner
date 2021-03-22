const {User, Role} = require('../models');
const bcrypt = require('bcrypt');

module.exports = {

    enterInformations: async (req, res, next) => {

        const email = req.body.email1;
        const password = req.body.password1;
        const pseudonyme = req.body.pseudo1;

        try {

            const emailInDb = await User.findOne({ where: {email: `${email}`}});
            const pseudoInDb = await User.findOne({ where: {pseudonyme: `${pseudonyme}`}});

            if (emailInDb === null && pseudoInDb === null) {

                const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

                const newUser = new User({
                    email: email,
                    password: hash,
                    pseudonyme: pseudonyme,
                    status: 0,
                });

                const result = await newUser.save();

                // Maintenant on attribue au nouvel utilisateur un role
                
                const user = await User.findOne({ where: {email: `${email}`}});

                console.log(user)
                
                const role = await Role.findByPk(2);
                console.log(role)
                if (user && role) {

                    await user.addRole(role);

                    const userEdit = await user.reload({
                        include: 'users'
                    });

                    res.json(userEdit); 
                }

            } else {
                next();
            };

        } catch (error) {
            console.error(error);
            res.status(500).json({error: error.message});
        };
    },

};
