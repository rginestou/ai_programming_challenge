const generateMap = require('./utils/mapGenerator')
const mapUtils = require('./utils/map')
const config = require('./config')
const settings = require('./settings')
const Team = require('./team')
const Villager = require('./element/villager')
const Knight = require('./element/knight')
const Archer = require('./element/archer')
const Sawmill = require('./element/sawmill')
const Barrack = require('./element/barrack')

// ====================================================
//  > Core
// ----------------------------------------------------
// 	Class for a game between to players.
//	-> attributes: done, winner
//	-> methods: getState, doAction, update
//			addElement, hasEnough
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
		this.teams[0].resources.wood = 1000
		this.teams[1].resources.wood = 1000
		this.addElement({id:0, name:"barrack", x:0, y:0})
		this.addElement({id:0, name:"knight", x:2, y:0})

		this.addElement({id:1, name:"barrack", x:12, y:0})
		this.addElement({id:1, name:"knight", x:11, y:1})
		// this.shootElement({ id:1, x:11, y:1, tx:10, ty:0 })
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

	// > doAction (teamId(id), { type, params = { ... } })
	//		All actions done by AI will be passed here,
	// 		with the corresponding params.
	//		Return if the action was a success
	doAction (id, action) {
		switch (action.type) {
		case 'move':
			// params = { x, y, tx, ty }
			return this.moveElement({id: id, params})
			break
		case 'shoot':
			// params = { x, y, tx, ty }
			return this.shootElement({id: id, params})
			break
		case 'harvest':
			this.state.values[id] = action.params.value
			break
		case 'build':
			this.state.values[id] = action.params.value
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

	// > moveElement ({ teamId(id), x, y, tx, ty })
	//		Generic class that check the type of the element to move,
	// 		then set the content of the new cell, as well as set the
	//		previous cell to `null`.
	moveElement (a) {
		let e = this.elements[a.x][a.y]
		// Check if the player has the right to move it
		if (a.id != e.team.id &&
			!mapUtils.isAreaClear(a.tx, a.ty, 1, 1, this.terrain, this.elements)) {
			return false
		}
		switch (e.name) { // TODO
		case "villager":
			if (!mapUtils.isWithinRadius(1, {x: e.x, y: e.y}, {x: e.tx, y: e.ty})) {
				return false
			}
			break
		case "knight":
			if (!mapUtils.isWithinRadius(1, {x: e.x, y: e.y}, {x: e.tx, y: e.ty})) {
				return false
			}
			break
		default:
			return false
		}
		// Move the element
		this.elements[a.x][a.y] = null
		this.elements[a.tx][a.ty] = e
		return true
	}

	// > addElement ({ teamId(id), name, x, y })
	// 		Generic class that check the type of the element to add,
	// 		verifies and takes relevant actions.
	addElement (e) { // TODO add square, add to team
		// Has the ressources to add the element ?
		if (!this.hasEnoughRessources(e.id, e.name)) {
			console.log("Not enough resources")
			return false
		}

		switch (e.name) {
		// Units
		case "villager":
			// Check if possible
			//	- Is the terrain free of obstacles ?
			if (!mapUtils.isAreaClear(e.x, e.y, 1, 1, this.terrain, this.elements)) {
				console.log("Area not clear");
				return false
			}
			// Add the element
			this.elements[e.x][e.y] = new Sawmill(this.teams[e.id], e.x, e.y)
			break
		case "knight":
			// Check if possible
			//	- Is the terrain free of obstacles ?
			//	- Is this position next to a barrack ?
			if (!mapUtils.isAreaClear(e.x, e.y, 1, 1, this.terrain, this.elements) ||
				!mapUtils.isNearBarracks(this.teams[e.id], e.x, e.y)) {
				console.log("Area not clear, or not near barracks");
				return false
			}
			// Add the element
			this.elements[e.x][e.y] = new Knight(this.teams[e.id], e.x, e.y)
			break
		// Buildings
		case "sawmill":
			// Check if possible
			//	- Is the terrain free of obstacles ?
			if (!mapUtils.isAreaClear(e.x, e.y, 2, 2, this.terrain, this.elements)) {
				console.log("Area not clear");
				return false
			}
			// Add the element
			this.elements[e.x][e.y] = new Sawmill(this.teams[e.id], e.x, e.y)
			break
		case "barrack":
			// Check if possible
			//	- Is the terrain free of obstacles ?
			if (!mapUtils.isAreaClear(e.x, e.y, 2, 2, this.terrain, this.elements)) {
				console.log("Area not clear");
				return false
			}
			// Add the element
			this.elements[e.x][e.y] = new Barrack(this.teams[e.id], e.x, e.y)
			break
		default:
			return false
		}
		return true
	}

	// > shootElement ({ teamId(id), x, y, tx, ty })
	//		Generic class that check the type of the element that shoot,
	//		as well as the victim's, then decrease its HP.
	shootElement (a) { // TODO
		let e = this.elements[a.x][a.y]
		let target = this.elements[a.tx][a.ty]
		if (e && target) {
			// Check if the player has the right to shoot
			if (a.id != e.team.id || a.id == target.team.id) {
				return false
			}
			// Check the shooter's and target's type
			if (!(e instanceof Knight || e instanceof Archer) ||
			!(target instanceof Knight || target instanceof Archer)) {
				return false
			}
			target.healthPoint -= e.getPresets().damage
			if (target.healthPoint <= 0) {
				// Delete from team
				let index = this.team[target.team.id].elements.indexOf(target)
				if (index > -1) {
					this.team[target.team.id].elements.splice(index, 1)
				}
				// Delete from terrain
				this.elements[a.tx][a.ty] = null
			}
			return true
		}
		console.log("Shooter or target not defined");
		return false
	}

	// > hasEnough (id, name)
	// 		Checks if the specified player has the required amount to purchase an item.
	hasEnoughRessources (id, name) {
		return (this.teams[id].resources.wood >= settings[name].cost.wood &&
		this.teams[id].resources.glory >= settings[name].cost.glory)
	}

}
