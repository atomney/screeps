var abilityGetSpawnDistance = require('ability.getspawndistance');
var abilityChangeState = require('ability.changestate');
var abilityGoToClosestSource = require('ability.gotoclosestsource');
var abilityUpgradeController = require('ability.upgradecontroller');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // Add distance to spawn to creep.memory.spawndistance
        abilityGetSpawnDistance.run(creep);

        // Change state of creep.memory.building if empty
        abilityChangeState.run(creep);

        if (!creep.memory.building) {
            abilityGoToClosestSource.run(creep);
        } else {
            abilityUpgradeController.run(creep);
        }
    }
};

// Export role
module.exports = roleUpgrader;
