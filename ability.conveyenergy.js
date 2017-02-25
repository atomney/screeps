var abilityConveyEnergy = {

    /** @param {Creep} creep **/
    run: function(creep) {


        // Find empty creep
        var emptycreep = creep.pos.findClosestByPath(FIND_CREEPS, {
            filter: function(object) {
                return (creep.carry.energy == 0 && creep != null || creep != undefined || creep.memory.spawndistance != null || creep.memory.spawndistance != undefined);
            }
        });
        // Create a path
        var path = spawn.room.findPath(spawn, source);
        //creep.moveByPath(path);
        var nextcreep = creep.room.lookForAt('creep', creep.pos.x+1, creep.pos.y);
        // Give resources to closest creep with distance to spawn less than mine.
        if (emptycreep.memory.spawndistance < creep.memory.spawndistance || emptycreep.energy < creep.energy) {
            if (creep.transfer(emptycreep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(emptycreep, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                }, {
                    reusePath: 50
                });
                creep.say('🎁 sharing');
                console.log('sharing');
            }
        }
    }
};

// Export role
module.exports = abilityConveyEnergy;
