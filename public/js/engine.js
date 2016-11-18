/* global io, Graphics, displayGame */

// Communication to server
const socket = io.connect()
socket.on('gameState', data => {
  console.log(data)
  // socket.emit('my other event', { my: 'data' })
  displayGame(data.mapSize, data.terrain, data.elements)
})

// Show graphics
Graphics.setup('screen')
