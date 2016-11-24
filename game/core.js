const generateMap = require('../utils/mapGenerator')
const config = require('../config')
const Team = require('./team')

// ====================================================
//  > Core
// ----------------------------------------------------
// 	Class for a game between to players.
//	-> attributes: done, winner
//	-> methods: getState, doAction, update
// ====================================================
module.exports = class Core {
	constructor () {
		// Game init
		this.done = false // the game will stop when done is true
		this.winner = null // 0 or 1 depending on who is the winner

		// Create teams
		this.teams = [ new Team(0), new Team(1) ]

		let [terrain, elements] = generateMap()
		this.terrain = terrain // fixed terrain
		this.elements = elements // all game elements
	}

	// > getState ()
	//		return all the informations about the game
	// that will be given to the AI.
	getState () {
		return {
			mapSize: config.mapGen.mapSize,
			terrain: this.terrain,
			elements: this.elements.map(a => a.map(b => b ? b.jsonify() : null))
		}
	}

	// > doAction (playerId, { type, params = { ... } })
	//		All actions done by AI will be passed here,
	// with the corresponding params.
	doAction (playerId, action) {
		switch (action.type) {
		case 'play':
			this.state.values[playerId] = action.params.value
			break
		default:
			console.log('Unknown action:', action)
		}
	}

	// > update ()
	//		Called at the end of each turn of the game.
	update () {
		this.state.turn += 1
		if (this.state.turn > 1e3) {
			this.done = true
			this.winner = (this.state.scores[0] > this.state.scores[1] ? 0 : 1)
		} else {
			if (this.state.values[0] > this.state.values[1]) {
				this.state.scores[0] += 1
			} else {
				this.state.scores[1] += 1
			}
		}
	}

}
