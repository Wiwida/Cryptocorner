const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database');

class User extends Model {};

User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    pseudonyme: DataTypes.STRING
}, {
    sequelize: sequelize,
    tableName: 'user'
});

module.exports = User;