const Element = require('./building')
const data = require('../data/buildings.json')

// ====================================================
//  > ProductionBuilding
// ----------------------------------------------------
// 	Class for production buildings
// ====================================================

module.exports = class ProductionBuilding extends Building {
  constructor(team, id, x, y){
    super(team, id, x, y)
  }
  /* TODO : add an array attribute containing the produceable units (maybe add it to buildings.json ?)
   * implement methods to produce a unit (handle production time in turns, queue up the different building requests)
   */
}
