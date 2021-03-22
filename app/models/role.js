const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database');

class Role extends Model {};

Role.init({
    name: DataTypes.STRING
}, {
    sequelize: sequelize,
    tableName: 'role'
});

module.exports = Role;