const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const  setupModels  = require('../db/models/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.port}/${config.dbName}`;

const sequelize = new Sequelize(config.dbName, USER, PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging:false,
  setup: true,
});
setupModels(sequelize);
sequelize.sync();

module.exports = sequelize;
