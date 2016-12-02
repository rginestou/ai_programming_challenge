const fs = require('fs')
const Core = require('../game/core')
const socketIO = require('socket.io')

// ====================================================
//  > init (server)
// ====================================================
function init (server) {
  io = socketIO(server)
  io.on('connection', socket => {
	  socket.emit('ai-list', getAiList())
    socket.on('start-game', aiList => {
	console.log('Start game:', aiList[0], 'vs', aiList[1])
	startGame(socket, aiList[0], aiList[1])
    })
  })
}

// ====================================================
//  > startGame (socket, AI_1, AI_2)
// ----------------------------------------------------
// 	Play a game between two AIs whith the names AI_1 &
// AI_2 and update it t=until it ends.
// ====================================================
function startGame (socket, ...botNames) {
	// Initialize
	let game = new Core()
	let bots = []
	for (let i of [0, 1]) {
		bots[i] = require('../ai/' + botNames[i])
		bots[i].init(i, game.getState())
	}
	socket.emit('start-game', game.getState())

	// Update game (1 turn)
	let updateGame = () => {
		// console.log('Game update')
		let actions = []
		for (let i of [0, 1]) actions[i] = bots[i].getActions(game.getState())
		for (let i of [0, 1]) for (let action of actions[i]) game.doAction(i, action)
		game.update()
		socket.emit('update-game', game.getState())
	}

	// End game
	let endGame = () => {
		// TODO: Do stuffs
		console.log('Winner is: ' + botNames[game.winner] + ' (' + game.winner + ')')
    socket.emit('end-game', { winner: game.winner })
	}

	// Game loop
	let gameLoop = () => {
		updateGame()
		// if (game.done) return endGame()
		setTimeout(gameLoop, 0) // Asynchronize
	}

	// Start the loop
	gameLoop()
}

function getAiList () {
	return fs.readdirSync('ai').map(file => file.replace('.js', ''))
}

module.exports = {
	init,
	startGame,
	getAiList
}
