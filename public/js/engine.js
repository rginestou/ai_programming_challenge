/* global io, Canvas, displayGame */

// Communication to server
const socket = io.connect()
socket.on('gameState', data => {
	console.log(data)
	// socket.emit('my other event', { my: 'data' })
	screen.removeAll()
	displayGame(screen, data.mapSize, data.terrain, data.elements)
})

// Show graphics
const screen = new Canvas('screen')
