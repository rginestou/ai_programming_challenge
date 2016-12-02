const Element = require('./element')

// ====================================================
//  > Building
// ----------------------------------------------------
// 	Class for buildings
// ====================================================
module.exports = class Building extends Element {

	// > constructor (Team team, x, y)
	constructor (team, x, y) {
		super(x, y)
		this.team = team

		// Building queue
		const MAX_QUEUE_SIZE = 5
		this.queue = new queue(MAX_QUEUE_SIZE)

		// Add to team
		if (team) team.elements.push(this)
	}

	// > jsonify ()
	//		return an object that can be given
	// to the AI or the renderer
	jsonify () {
		return Object.assign(
			super.jsonify(),
			{ type: 'building' }
		)
	}
}

// Basic limited size queue implementation used for queuing production
class queue{
	constructor(max_queue_size){
		this.queue = new Array()
		this.queueSize = max_queue_size
	}

	push(item){
		if (this.queueSize < MAX_QUEUE_SIZE)
		{
			this.queue.unshift(item)
		}
		// Maybe display an error to the player ?
	}

	pop(){
		return this.queue.pop()
	}
}
