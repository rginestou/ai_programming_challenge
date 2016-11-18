module.exports = class GameElement {

	constructor (id, x, y) {
		this.id = id
		this.x = x
		this.y = y
		this.size = 1
		this.team = null
		this.sprite = { x: 0, y: 0 }
	}

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
