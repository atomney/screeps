var abilityUpgradeController = {

    /** @param {Creep} creep **/
    run: function(creep) {

      // Upgrade room controller
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller, {
              visualizePathStyle: {
                  stroke: '#ffffff'
              }
          });
      }
    }
};

// Export role
module.exports = abilityUpgradeController;
