const generateMap = require('./utils/mapGenerator')
const mapUtils = require('./utils/map')
const config = require('./config')
const Team = require('./team')
const Villager = require('./element/villager')
const Sawmill = require('./element/sawmill')

// ====================================================
//  > Core
// ----------------------------------------------------
// 	Class for a game between to players.
//	-> attributes: done, winner
//	-> methods: getState, doAction, update
//			addElement
// ====================================================
module.exports = class Core {
	constructor () {
		// Game init
		this.turn = 0
		this.done = false // the game will stop when done is true
		this.winner = null // 0 or 1 depending on who is the winner

		// Create teams
		this.teams = [ new Team(0), new Team(1) ]

		let [terrain, elements] = generateMap()
		this.terrain = terrain // fixed terrain
		this.elements = elements // all game elements

		// Testing purposes TODO
		this.addElement({id:0, name:"sawmill", x:0, y:0})
	}

	// > getState ()
	//		return all the informations about the game
	// 		that will be given to the AI.
	getState () {
		return {
			mapSize: config.mapGen.mapSize,
			terrain: this.terrain,
			elements: this.elements.map(a => a.map(b => b ? b.jsonify() : null))
		}
	}

	// > doAction (playerId, { type, params = { ... } })
	//		All actions done by AI will be passed here,
	// 		with the corresponding params.
	doAction (playerId, action) {
		switch (action.type) {
		case 'move':
			this.state.values[playerId] = action.params.value
			break
		case 'shoot':
			this.state.values[playerId] = action.params.value
			break
		case 'harvest':
			this.state.values[playerId] = action.params.value
			break
		case 'build':
			this.state.values[playerId] = action.params.value
			break
		default:
			console.log('Unknown action:', action)
		}
	}

	// > update ()
	//		Called at the end of each turn of the game.
	update () {
		this.turn += 1
		if (this.turn > 1e3) {
			this.done = true
			return
		}
	}

	// > addElement ({ teamId(id), name, x, y })
	// 		Generic class that check the type of the element to add,
	// 		verifies and takes relevant actions
	addElement (e) {
		switch (e.name) {
		case "unit":

			break
		case "sawmill":
			// Check if possible
			if (!mapUtils.isAreaClear(e.x, e.y, 2, 2, this.terrain, this.elements) &&
				!this.hasEnough(e.id, "sawmill")) {
				return false
			}
			// Add the actual element
			this.elements[e.x][e.y] = new Sawmill(this.teams[e.id], e.x, e.y)
			break
		default:
			return false
		}
		return true
	}

	// > hasEnough (id, name)
	// 		Checks if the specified player has the required amount to purchase an item
	hasEnough (id, name) {
		return (this.teams[id].resources.wood >= config.cost.sawmill.wood &&
		this.teams[id].resources.glory >= config.cost[name].glory)
	}

}
