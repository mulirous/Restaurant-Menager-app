const { Sequelize } = require('sequelize');
const config = require('./config');
const env = process.env.NODE_ENV || 'development'; 
const dbConfig = config[env];

// Cria uma instância do Sequelize usando a configuração
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
});

module.exports = sequelize;
