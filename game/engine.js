const GameCore = require('./core')

function startGame (...botNames) {
	// Initialize
	let game = new GameCore()
	let bots = []
	for (let i of [0, 1]) {
		bots[i] = require('../ai/' + botNames[i])
		bots[i].init(i, game.getState())
	}

	// Update game (1 turn)
	let updateGame = () => {
		// console.log('Game update')
		let actions = []
		for (let i of [0, 1]) actions[i] = bots[i].getActions(game.getState())
		for (let i of [0, 1]) for (let action of actions[i]) game.doAction(i, action)
		game.update()
	}

	// End game
	let endGame = () => {
		// TODO: Do stuffs
		console.log('Winner is: ' + botNames[game.winner] + ' (' + game.winner + ')')
	}

	// Game loop
	let gameLoop = () => {
		if (game.done) return endGame()
		updateGame()
		setTimeout(gameLoop, 0) // Asynchronize
	}

	// Start the loop
	gameLoop()
}

module.exports = {
	startGame
}
