var abilityGetSpawnDistance = require('ability.getspawndistance');
var abilityChangeState = require('ability.changestate');
var abilityGoToClosestSource = require('ability.gotoclosestsource');
var abilityUpgradeController = require('ability.upgradecontroller');
var abilityBuild = require('ability.build');
var abilityRepair = require('ability.repair');
var abilityBuildRoad = require('ability.buildroad');

var roleConstructor = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //// Variables
        // Add distance to spawn to creep.memory.spawndistance
        abilityGetSpawnDistance.run(creep);

        // SOURCES Sources of energy
        var sources = creep.room.find(FIND_SOURCES);

        // Repair roads if buildings are built
        var stuffToRepair = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(object) {
                return (object.hits < object.hitsMax);
            }
        });
        // Controller Level
        var rootroom = Game.spawns['ROOT'].room
        var controllerlevel = rootroom.controller.level

        // TARGETS Structures needing energy
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        })

        // Flags
        var flagnames = creep.room.find(FIND_FLAGS, {
            filter: (flags) => {
                return (Game.flags.name);
            }
        })


        // Find number of extensions
        var extensions = rootroom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION);
            }
        })

        // Find number of towers
        var towers = rootroom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER);
            }
        })

        // BUILDINGSS Buildings needing to be built
        var buildings = creep.room.find(FIND_CONSTRUCTION_SITES);

        // Spawn location
        var spawnx = Game.spawns['ROOT'].pos.x
        var spawny = Game.spawns['ROOT'].pos.y

        // Change state of creep after inventory empty
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if (creep.memory.building) {
            // Clear Flags
            /*
            if (Game.flags.name != 'GUARD') {
              for(var name in Game.flags) { console.log("Removing: " + name); Game.flags[name].remove();}
            }
            */

            // Build flag for soldiers
            if (!Game.flags['GUARD']) {
                creep.room.createFlag(spawnx - 3, spawny, 'GUARD', COLOR_RED, COLOR_RED);
                creep.say('🚩 flag');
            }

            // Build level 2 extensions if able
            else if (controllerlevel >= 2 && extensions.length < 5 && buildings.length == 0) {
                if (rootroom.energyAvailable >= 300 && extensions.length < 1) {
                    creep.room.createConstructionSite(spawnx, spawny + 2, STRUCTURE_EXTENSION);
                    creep.say('🚧 ext 01');
                } else if (rootroom.energyAvailable >= 350 && extensions.length < 2) {
                    creep.room.createConstructionSite(spawnx, spawny + 3, STRUCTURE_EXTENSION);
                    creep.say('🚧 ext 02');
                } else if (rootroom.energyAvailable >= 400 && extensions.length < 3) {
                    creep.room.createConstructionSite(spawnx + 1, spawny + 2, STRUCTURE_EXTENSION);
                    creep.say('🚧 ext 03');
                } else if (rootroom.energyAvailable >= 450 && extensions.length < 4) {
                    creep.room.createConstructionSite(spawnx + 1, spawny + 3, STRUCTURE_EXTENSION);
                    creep.say('🚧 ext 04');
                } else if (rootroom.energyAvailable >= 500 && extensions.length < 5) {
                    creep.room.createConstructionSite(spawnx + 2, spawny + 2, STRUCTURE_EXTENSION);
                    creep.say('🚧 ext 05');
                }
            }

            // Build towers if able
            else if (controllerlevel >= 3 && extensions.length >= 5 && buildings.length == 0 && towers.length < 1 && rootroom.energyAvailable >= 300) {
                creep.room.createConstructionSite(spawnx + 2, spawny, STRUCTURE_TOWER);
                creep.say('🚧 tower');
            }

            // Build level 3 extensions if able
            else if (controllerlevel >= 3 && extensions.length < 10 && buildings.length == 0) {
                if (rootroom.energyAvailable >= 550 && extensions.length < 6) {
                    creep.room.createConstructionSite(spawnx + 2, spawny + 3, STRUCTURE_EXTENSION);
                    creep.say('🚧 ext 06');
                } else if (rootroom.energyAvailable >= 600 && extensions.length < 7) {
                    creep.room.createConstructionSite(spawnx + 3, spawny + 2, STRUCTURE_EXTENSION);
                    creep.say('🚧 ext 07');
                } else if (rootroom.energyAvailable >= 650 && extensions.length < 8) {
                    creep.room.createConstructionSite(spawnx + 3, spawny + 3, STRUCTURE_EXTENSION);
                    creep.say('🚧 ext 08');
                } else if (rootroom.energyAvailable >= 700 && extensions.length < 9) {
                    creep.room.createConstructionSite(spawnx + 4, spawny + 2, STRUCTURE_EXTENSION);
                    creep.say('🚧 ext 09');
                } else if (rootroom.energyAvailable >= 750 && extensions.length < 10) {
                    creep.room.createConstructionSite(spawnx + 4, spawny + 3, STRUCTURE_EXTENSION);
                    creep.say('🚧 ext 10');
                }
            }

            // Use energy to build things if structures are full
            else if (buildings.length > 0) {
              // Build stuff
              abilityBuild.run(creep);
            } else if (stuffToRepair) {
              // Repair Stuff
              abilityRepair.run(creep);
            } else {
              // Upgrade room controller
              abilityUpgradeController.run(creep);
            }
        } else {
            var terrain = creep.room.lookForAt('terrain', creep.pos.x, creep.pos.y);
            if (terrain == 'swamp') {
              abilityBuildRoad.run(creep);
            }
            // If not carrying any energy go get some
            abilityGoToClosestSource.run(creep);


        }
    }
};

// Export role
module.exports = roleConstructor;
