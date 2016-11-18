const config = require('./config')

const express = require('express')
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', function (data) {
    console.log(data)
  })
})

app.use(express.static('public'))
server.listen(config.port, function(){console.log('App running on port ' + config.port)})
