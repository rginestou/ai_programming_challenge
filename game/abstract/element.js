// ====================================================
//  > Element
// ----------------------------------------------------
// 	Class for all items on the terrain (trees, towers,
// lancer, etc.)
// ====================================================
module.exports = class Element {

	// > constructor (x, y)
	constructor (x, y) {
		this.team = null // team (Team) the element belongs to, null for none
		this.pos = {x : x, y : y} // Coord. on the map
		this.size = 1 // Size of the slot occupied (1x1, 2x2, etc.)
		this.healthPoint = 10 // Health points of the element
		this.maxHealthPoint = 10 // Maximum HP this element can ever have
		this.sprite = { x: 0, y: 0 } // position (x, y) of the sprite on the spriteset (1 = 32px)
		this.cost = 0 // Cost of the element, to be defined in inherited classes (Units, Buildings)

		// Static variables TODO
		this.attackFactors = {}
		this.defenseFactors = {}
	}

	// > jsonify ()
	//	return an object that can be given
	//to the AI or the renderer
	jsonify () {
		return {
			type: 'none',
			id: this.id,
			pos: this.pos,
			size: this.size,
			team_id: this.team ? this.team.id : -1,
			sprite: this.sprite
		}
	}

}
