/*
Handle the unit class, intanciated for every unit in the game
*/

var Unit = function ( type, side, position, dir ) {
	this.type = type
	this.side = side
	this.position = position
	this.direction = dir
	this.action = 0
	this.key = 0
}

var Building = function ( id, side, position, size ) {
	this.id = id
	this.size = size
	this.side = side
	this.position = position
}
