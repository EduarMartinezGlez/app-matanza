const db = require('mongoose')


db.Promise = global.Promise

async function connect (url) {
  const d = await db.connect(url, { useNewUrlParser: true })
}

// console.log( d ,'[db] conectada')

module.exports = connect
