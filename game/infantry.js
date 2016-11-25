const Military = require('./military.js')
const data = require('../data/units.json')

module.exports = class Infantry extends Military {

  // call the military constructor
  constructor(team, id, x, y){
    super(team, id, x, y)
    this.ammoStock = data[id].ammo_stock
    this.attackDamage = data.[id].attack_damage
  }

  function useAmmo(){
    this.ammoStock--
  }

  function isMagEmpty(){
    return this.ammoStock <= 0
  }

  function reloadWeapon(){
    this.ammoStock = data[id].ammo_stock
  }

  function attack(target){
    if (!this.isMagEmpty()){
      target.takeDamage(this.attackDamage)
    }
    else {
      // Reloads automatically if the magazine is empty
      this.reloadWeapon()
    }
  }


  // > jsonify ()
	//		return an object that can be given
	// to the AI or the renderer
	jsonify () {
		return Object.assign( super.jsonify(), { type: 'infantry' })
	}
}
