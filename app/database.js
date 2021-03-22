require('dotenv').config();

const {Sequelize} = require('sequelize');

//on instancie un object de la class Sequelize
const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        timestamps: false,
        //permet le nom de champs en snake_case
        underscored: true
    }
});

//notre client de connexion est prêt à l'emploi
module.exports = sequelize;