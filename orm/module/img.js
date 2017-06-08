const Sequlize = require('sequelize');
const sequlize = require('../sequelize');

var Img = sequlize.define('img', {
    id: {
        type: Sequlize.BIGINT,
        primaryKey: true,
    },
    url: Sequlize.STRING(1000)
}, {
    freezeTableName: true,
    timestamps: false,
});

module.exports = Img;
