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
		super(id, x, y)
		this.team = team
		this.load = 0 // What the villager carries
		// Read data
		this.name = data[id].name
		this.maxHealthPoint = data[id].life
		this.healthPoint = this.maxHealthPoint
		this.walkRange = data[id].walk_range
		// Add to team
		if (team) team.elements.push(this)
	}

	// > jsonify ()
	//		return an object that can be given
	// to the AI or the renderer
	jsonify () {
		return Object.assign( super.jsonify(), { type: 'unit' })
	}

}
