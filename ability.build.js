var abilityBuild = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // Buildings needing to be built
        var buildings = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (creep.build(buildings[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(buildings[0], {
                visualizePathStyle: {
                    stroke: '#ffffff'
                }
            }, {
                reusePath: 50
            });
            creep.say('🚧 build');
        }
    }
};

// Export role
module.exports = abilityBuild;
