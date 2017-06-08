const Sequlize = require('sequelize');
const sequlize = require('../sequelize');

var News = sequlize.define('news', {
    id: {
        type: Sequlize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    title: Sequlize.STRING(100),
    writer: Sequlize.STRING(100),
    content: Sequlize.STRING(10000)
}, {
    freezeTableName: true,
    timestamps: true,
});

module.exports = News;
