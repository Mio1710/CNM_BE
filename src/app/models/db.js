const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cnm_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
    dialectModule: require('mysql2')
})
module.exports = sequelize;