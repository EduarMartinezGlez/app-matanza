require('dotenv').config()
const config ={
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    dbHost: process.env.HOST || 'localhost',
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    jwtSecret: process.env.JWT_SECRET,
    emailSecret: process.env.EMAIL_SECRET,
    adminEmail:process.env.ADMIN_EMAIL


}
module.exports = {config}
