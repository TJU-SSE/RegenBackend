const Sequlize = require('sequelize');
const sequlize = require('../sequelize');

var Test = sequlize.define('test', {
    id: {
        type: Sequlize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequlize.STRING(1000),
    url: Sequlize.STRING(1000),
    age: Sequlize.BIGINT
}, {
    freezeTableName: true,
    timestamps: false,
});

Test.sync().then(function () {
    console.log("create test success");
});

module.exports = Test;
