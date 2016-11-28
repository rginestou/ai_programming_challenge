const Unit = require('./unit')
const data = require('../data/units.json')

// ====================================================
//  > Military
// ----------------------------------------------------
// 	Class for villagers (carry resources / build)
// ====================================================
module.exports = class Villager extends Unit {

	// > constructor (Team team, id, x, y)
	constructor (team, id, x, y) {
		super(team, id, x, y)
		this.team = team
		// Read data
		this.name = data[id].name
		this.maxHealthPoint = data[id].life
		this.healthPoint = this.maxHealthPoint
		this.walkRange = data[id].walk_range
	}

	function attack(target, damage){
		target.takeDamage(damage)
	}

	// > jsonify ()
	//		return an object that can be given
	// to the AI or the renderer
	jsonify () {
		return Object.assign(super.jsonify(), { type: 'military' })
	}

}
