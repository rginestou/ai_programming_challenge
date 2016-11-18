module.exports = class GameTeam {

	constructor (id) {
		this.id = id
		this.resources = 0
		this.elements = []
	}

	jsonify () {
		return {
			id: this.id,
			resources: this.resources,
			elements: this.elements.map(e => e.jsonify())
		}
	}

}
