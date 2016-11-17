const GameCore = require('./core')

function startGame (...botNames) {
  // Initialize
  let game = new GameCore()
  let bots = []
  for (let i of [0, 1]) {
    bots[i] = require('../ai/' + botNames[i])
    bots[i].init(i, game.getState())
  }

  // Play the game
  while (!game.done) {
    let actions = []
    for (let i of [0, 1]) {
      actions[i] = bots[i].getActions(game.getState())
    }
    for (let i of [0, 1]) {
      for (let action of actions[i]) game.doAction(i, action)
    }
    game.update()
  }

  // Game ended
  console.log('Winner is: ' + botNames[game.winner] + ' (' + game.winner + ')')
  // TODO: Do stuffs
}

module.exports = {
  startGame
}
