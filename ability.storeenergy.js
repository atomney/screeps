var abilityStoreEnergy = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // TARGETS Structures needing energy
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        })
        // Give energy to structures first
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                }, {
                    reusePath: 50
                });
                //creep.memory.destination = targets[0];
                creep.say('🎁 store');
            }
        }
    }
};

// Export role
module.exports = abilityStoreEnergy;
