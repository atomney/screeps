var abilityGetSpawnDistance = require('ability.getspawndistance');
var abilityChangeState = require('ability.changestate');
var abilityGoToClosestSource = require('ability.gotoclosestsource');
var abilityUpgradeController = require('ability.upgradecontroller');
var abilityStoreEnergy = require('ability.storeenergy');
var abilityShareEnergy = require('ability.shareenergy');
var abilityBuild = require('ability.build');

var roleOmniCreep = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // Add distance to spawn to creep.memory.spawndistance
        abilityGetSpawnDistance.run(creep);
        // SOURCES Sources of energy
        var sources = creep.room.find(FIND_SOURCES);

        // TARGETS Structures needing energy
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        })
        // BUILDINGSS Buildings needing to be built
        var buildings = creep.room.find(FIND_CONSTRUCTION_SITES);
        // Find full creep
        var fullcreep = creep.pos.findClosestByPath(FIND_CREEPS, {
            filter: function(object) {
                return (creep.carry.energy >= 50 && creep != null || creep != undefined || creep.carry.energy != null || creep.carry.energy != undefined);
            }
        });

        // Find empty creep
        var emptycreep = creep.pos.findClosestByPath(FIND_CREEPS, {
            filter: function(object) {
                return (creep.carry.energy == 0 && creep != null || creep != undefined || creep.memory.spawndistance != null || creep.memory.spawndistance != undefined);
            }
        });


        // Change state of creep after inventory empty
        abilityChangeState.run(creep);

        if (creep.memory.building) {
            if (emptycreep.memory.spawndistance < creep.memory.spawndistance || emptycreep.energy < creep.energy) {
                // Share energy
                abilityShareEnergy.run(creep);
            }
            if (targets.length > 0) {
                // Store energy in structures
                abilityStoreEnergy.run(creep);
            } else if (buildings.length > 0) {
                // Build stuff
                abilityBuild.run(creep);
            } else {
                // Upgrade room controller
                abilityUpgradeController.run(creep);
            }
        } else {
            // If not carrying any energy go get some
            abilityGoToClosestSource.run(creep);
        }
    }
};

// Export role
module.exports = roleOmniCreep;
