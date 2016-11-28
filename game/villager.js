const Unit = require('./unit')
const data = require('../data/units.json')

// ====================================================
//  > Villager
// ----------------------------------------------------
// 	Class for villagers (carry resources / build)
// ====================================================
module.exports = class Villager extends Unit {

	// > constructor (Team team, id, x, y)
	constructor (team, id, x, y) {
		super(team, id, x, y)
		this.team = team
		this.load = 0 // What the villager carries
		this.sprite = { x: 1, y: 2 }
		// Read data
		this.name = data[id].name
		this.maxHealthPoint = data[id].life
		this.healthPoint = this.maxHealthPoint
		this.walkRange = data[id].walk_range
	}

	// > harvest
	// 	Update the villager's load of a certain amount
	harvest(amount) {
		this.load += amount
	}

	// > unload
	// 	Allows the villager to unload what it carries.
	// 	Return the unloaded amount
	unload() {
		let t = this.load
		this.load = 0
		return t
	}

	// > jsonify ()
	//		return an object that can be given
	// to the AI or the renderer
	jsonify () {
		return Object.assign( super.jsonify(), { type: 'unit' })
	}

}
