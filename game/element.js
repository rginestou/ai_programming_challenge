// ====================================================
//  > GameElement
// ----------------------------------------------------
// 	Class for all items on the terrain (trees, towers,
// lancer, etc.)
// ====================================================
module.exports = class GameElement {

	// > constructor (id, x, y)
	constructor (id, x, y) {
		this.id = id
		this.x = x // X coord on the map
		this.y = y // Y coord on the map
		this.size = 1 // Size of the slot occupied (1x1, 2x2, etc.)
		this.team = null // team (GameTeam) the element belongs to, null for none
		this.sprite = { x: 0, y: 0 } // position (x, y) of the sprite on the spriteset (1 = 32px)
	}

	// > jsonify ()
	//		return an object that can be given
	// to the AI or the renderer
	jsonify () {
		return {
			type: 'none',
			id: this.id,
			x: this.x,
			y: this.y,
			size: this.size,
			team_id: this.team ? this.team.id : -1,
			sprite: this.sprite
		}
	}

}
