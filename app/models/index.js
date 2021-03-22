const Role = require('../models/role');
const User = require('../models/user');

User.belongsToMany(Role, {
    foreignKey: 'user_id',
    otherKey: 'role_id',
    as: 'users',
    through: 'user_role'
});

Role.belongsToMany(User, {
    foreignKey: 'role_id',
    otherKey: 'user_id',
    as: 'roles',
    through: 'user_role'
});

module.exports = {
    Role,
    User
};

