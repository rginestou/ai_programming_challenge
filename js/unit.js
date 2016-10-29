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
