var abilityGetSpawnDistance = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // Distance to spawn
        var rootspawn = Game.spawns['ROOT']
        var spawndistance = creep.pos.getRangeTo(rootspawn)
        creep.memory.spawndistance = spawndistance

    }
};

// Export role
module.exports = abilityGetSpawnDistance;
