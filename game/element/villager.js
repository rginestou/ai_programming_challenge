const Unit = require('../abstract/unit')

// ====================================================
//  > Villager
// ----------------------------------------------------
// 	Class for villagers (carry resources / build)
// ====================================================
module.exports = class Villager extends Unit {

	// > constructor (Team team, x, y)
	constructor (team, x, y) {
		super(team, x, y)
		this.load = 0 // What the villager carries
		this.sprite = { x: 1, y: 2 }
		// Read data
		// this.name = data[id].name
		// this.maxHealthPoint = data[id].life
		// this.healthPoint = this.maxHealthPoint
		// this.walkRange = data[id].walk_range
	}

	// > harvest
	// 	Update the villager's load of a certain amount
	harvest(amount) {
		this.load += amount

		return true
	}

	// > unload
	// 	Allows the villager to unload what it carries.
	// 	Return the unloaded amount
	unload() {
		let t = this.load
		this.load = 0
		return t
	}
}
