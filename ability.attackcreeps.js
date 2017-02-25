var abilityAttackCreeps = {

    /** @param {Creep} creep **/
    run: function(creep) {

      var creeptargets = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
          if(creeptargets) {
              if(creep.attack(creeptargets) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(creeptargets, {visualizePathStyle: {stroke: '#ffffff'}});
                  creep.say('⚔️ attack');
              }
          }
    }
};

// Export role
module.exports = abilityAttackCreeps;
