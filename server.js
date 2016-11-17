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
server.listen(config.server.port, () => console.log('App running on port ' + config.server.port))

// ===
// const GameTeam = require('./game/team')
// const GameUnit = require('./game/unit')
// const GameObstacle = require('./game/obstacle')
// const GameBuilding = require('./game/building')
//
// let team = new GameTeam(1)
//
// /* eslint-disable no-new */
// new GameObstacle(0, 4, 6)
//
// new GameUnit(team, 1, 2, 3)
// new GameUnit(team, 1, 3, 3)
// new GameUnit(team, 1, 4, 3)
// new GameBuilding(team, 2, 2, 2)
//
// console.log(team.jsonify())

const generate = require('./utils/mapGenerator')
console.log(generate({ mapSize: 10 }))
