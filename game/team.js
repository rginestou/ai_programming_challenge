// ====================================================
//  > Team
// ----------------------------------------------------
// 	Class for all information concerning one side of
// a game
// ====================================================
module.exports = class Team {

	// > constructor ((0 | 1) id)
	constructor (id) {
		this.id = id
		this.resources = { wood : 0, glory : 0 }
		this.elements = []
	}

	// > jsonify ()
	//		return an object that can be given
	//		to the AI or the renderer
	jsonify () {
		return {
			id: this.id,
			resources: this.resources,
			elements: this.elements.map(e => e.jsonify())
		}
	}

}
