var abilityGetSpawnDistance = require('ability.getspawndistance');
var abilityChangeSoldierState = require('ability.changesoldierstate');
var abilityAttackCreeps = require('ability.attackcreeps');
var abilityGuard = require('ability.guard');

var roleSoldier = {
    run: function(creep) {

        // Add distance to spawn to creep.memory.spawndistance
        abilityGetSpawnDistance.run(creep);

        // Things to kill
        var creeptargets = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        var structuretargets = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);

        // Change soldier state
        abilityChangeSoldierState.run(creep);

        // Attack hostile creeps and structures
        if (creep.memory.attack) {

            if (creeptargets) {
                abilityAttackCreeps.run(creep);
            }
        } else {
            // Move to guard flag
            abilityGuard.run(creep);

        }
    }
};

// Export role
module.exports = roleSoldier;
