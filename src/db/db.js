const db = require('mongoose')


db.Promise = global.Promise

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

async function connect (url) {
  const d = await db.connect(url, OPTIONS, MongoError => {
    // si algo sale mal mostramos el error y paramos el servidor
    if (MongoError) {
        console.error('eror de mongoose', MongoError);
        process.exit(1);
    }
})
}

module.exports = connect
