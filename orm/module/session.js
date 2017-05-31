const Sequlize = require('sequelize');
const sequlize = require('../sequelize');

var Session = sequlize.define('session', {
    id: {
        type: Sequlize.STRING(100),
        primaryKey: true
    },
    username: Sequlize.STRING(100)
}, {
    freezeTableName: true,
    timestamps: false,
});

Session.sync().then(function () {
    console.log("create test success");
});

module.exports = Session;
