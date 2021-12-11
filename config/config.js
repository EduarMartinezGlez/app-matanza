require('dotenv').config()
const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  sercret: process.env.JWT_SERCRET,
  AdminEmail: process.env.ADMINEMAIL,
  EmailPass: process.env.EMAILPASS,
  BD_URL: process.env.URL
}
console.log('variable ' + config.UserEmail)
module.exports = { config }
