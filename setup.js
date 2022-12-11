'use strict'
const { config } = require('./config/config')
//const db = require('./db/')
const sequelize =require('./lib/sequelize')
const setupModels = require('./db/models/index')


async function setup() {
   // await sequelize(config).catch(handleFatalErrors)
    console.log('succes');
    sequelize.authenticate()
    if(config.setup){
       sequelize.sync({force:true})
       setupModels(sequelize)
    }
}
// function handleFatalErrors(err) {
//     console.log('error en el fatal error',err.message);
//     console.error(err.stack);
// }
setup()
