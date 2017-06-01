const Sequlize = require('sequelize');
const sequlize = require('../sequelize');

var User = sequlize.define('user', {
    username: {
        type: Sequlize.STRING(100),
        primaryKey: true
    },
    password: Sequlize.STRING(100)
}, {
    freezeTableName: true,
    timestamps: false,
});

User.sync().then(function () {
    console.log("create user success");
});

module.exports = User;
