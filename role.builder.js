var abilityGetSpawnDistance = require('ability.getspawndistance');
var abilityChangeState = require('ability.changestate');
var abilityGoToClosestSource = require('ability.gotoclosestsource');
var abilityBuild = require('ability.build');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
      //// Variables
      // Add distance to spawn to creep.memory.spawndistance
      abilityGetSpawnDistance.run(creep);

      // Change state when energy is empty
	    abilityChangeState.run(creep);

	    if(creep.memory.building) {
        // Build things that need to be built
        abilityBuild.run(creep);
	    } else {
        // Harvest from closest source
        abilityGoToClosestSource.run(creep);
	    }
	}
};

// Export role
module.exports = roleBuilder;
