const {config}= require('../config/config')

const USER = encodeURIComponent(config.dbUser)
 const PASSWORD = encodeURIComponent(config.dbPassword)
 const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.port}/${config.dbName}`


module.exports= {

  development:{
    "username": "EduardMartGlez",
    "password": "dejame",
    "database": "My_Store",
    "host": "localhost",
    "dialect": "postgres"
  },
  production:{
    url:URI,
    dialect: 'postgres',
  }

}
