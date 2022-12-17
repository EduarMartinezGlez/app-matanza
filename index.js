const express = require('express');
const cors = require('cors');
const session=require('express-session')
const routerApi = require('./routes');


const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}))

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));
//passport
app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
}))

require('./config/index.strategy')
app.use(passport.initialize())
app.use(passport.session())

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port' +  port);
});
