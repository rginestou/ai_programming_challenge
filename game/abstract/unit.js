const Element = require('./element')

// ====================================================
//  > Units
// ----------------------------------------------------
// 	Class for units
// ====================================================
module.exports = class Unit extends Element {

	// > constructor (Team team, id, x, y)
	constructor (team, x, y) {
		super(x, y)
		this.team = team
		this.target = null
		// Read data
		// this.name = data[id].name
		// this.maxHealthPoint = data[id].life
		// this.healthPoint = this.maxHealthPoint
		// this.walkRange = data[id].walk_range
		// this.cost = data[id].cost
		// Add to team
		if (team) team.elements.push(this)
	}

  // Attack method is not is not implemented here because villagers are assumed not to be able to attack.

	isAlive(){
		if (this.healthPoint <= 0){
			return true
		}
		return false
	}

  // Handle taking damage and check if the unit is dead afterwards
	takeDamage(damage){
		this.healthPoint -= damage
		if (!this.isAlive()){
			// Call unit destructor ????
			//this = null
		}
	}

	// > jsonify ()
	//		return an object that can be given
	// to the AI or the renderer
	jsonify () {
		return Object.assign(
			super.jsonify(),
			{ type: 'unit' }
		)
	}

}
