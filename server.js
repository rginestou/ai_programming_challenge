const config = require('./config')

const express = require('express')
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

const Core = require('./game/core')

io.on('connection', function (socket) {
	var game = new Core()
	socket.emit('gameState', game.getState())
	socket.on('my other event', function(data){console.log(data)})
})

app.use(express.static('public'))
server.listen(config.server.port, function(){console.log('App running on port ' + config.server.port)})

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

// const Engine = require('./game/engine')
//
// for (let i = 0; i < 10; i++) {
//   Engine.startGame('dumb', 'lessdumb')
// }
