 const {Sequelize}= require('sequelize')

 const {config}= require('../config/config')
 const setupModels = require('../db/models')



 const USER = encodeURIComponent(config.dbUser)
 const PASSWORD = encodeURIComponent(config.dbPassword)
 const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.port}/${config.dbName}`


  const sequelize = new Sequelize(config.dbName, 'postgres', 'dejame', {
    host: 'localhost',
    dialect:'postgres',
    logging: true,
  });

 setupModels(sequelize)

 module.exports= sequelize
