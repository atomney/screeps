var abilityGoToClosestSource = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // Go to closest source by path
        var sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources, {
                visualizePathStyle: {
                    stroke: '#ffffff'
                }
            });
        }
    }
};

// Export role
module.exports = abilityGoToClosestSource;
