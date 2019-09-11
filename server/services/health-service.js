const fs = require('fs')

async function writeLiveness () {
  fs.writeFile('/tmp/calculation-service-healthz.txt', Date.now(), (err) => {
    if (err) throw err
    console.log('creating healthz file')
  })
}

module.exports = writeLiveness