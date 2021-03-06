const express = require('express')
const app = express()
const { create } = require('express-handlebars')
const db = require('./src/db/db')
const router = require('./src/componentes/network/routes')
const bodyParser = require('body-parser')
const path = require('path')
const { dirname } = require('path')
const urlencode = bodyParser.urlencoded({ extends: false })
const passport = require('passport')
const {errorHandler, logErrors, boomerrorHandler} =require('./middleware/error.handle')
const helmet =require('helmet')

const { config } = require('./config/config')

//const url = config.BD_URL

//console.log('prueba de variables' + url)

const uri = `mongodb+srv://${config.dbUser}:${config.dbPassword}@app-matanza.h9pvd.mongodb.net/${config.dbName}?retryWrites=true&w=majority`
const internetdb = db(uri)

console.log('servidor internet ', internetdb)
app.use(express.static('/views'))
app.use(bodyParser.json())
app.use(urlencode)
app.use(express.json())
app.use(express.urlencoded({ extends: false }))
app.use(passport.initialize())
app.use(helmet())

// setting hbs
const hbs = create({
  layoutsDir: __dirname + '/views/layouts',
  defaultLayout: 'main',
  extname: '.hbs'
})

app.set('view engine', '.hbs')
app.engine('.hbs', hbs.engine)
app.set('views', './views')

app.use(express.static('public'))

const initializePassport = require('./util/index')
initializePassport(passport)

router(app)

//error handle
app.use(logErrors)
app.use(errorHandler)
app.use(boomerrorHandler)

app.listen(config.port, config.host, () =>{
  console.log('app running')})

