const config = require('./config')

const express = require('express')
const app = express()

const server = require('http').Server(app)
const engine = require('./lib/engine')
engine.init(server)

app.use(express.static('client'))
server.listen(config.port, () => console.log('App running on port ' + config.port))
