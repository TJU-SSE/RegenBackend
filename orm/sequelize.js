var Sequelize = require('sequelize');
var config = require('../utils/config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    // 仅 SQLite 适用
    // storage: 'path/to/database.sqlite'
});

module.exports = sequelize;
