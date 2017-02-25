var abilityGiveEnergy = {

    /** @param {Creep} creep **/
    run: function(creep) {


        // Find empty creep
        var notcollector = creep.pos.findClosestByRange(FIND_CREEPS, {
            filter: function(object) {
                return (creep.role != 'collector');
            }
        });
        // Give resources to closest creep with distance to spawn less than mine.
        //if(emptycreep != undefined && emptycreep != null && )
        if (notcollector) {
            creep.transfer(notcollector, RESOURCE_ENERGY, 50);
                creep.say('🎁 giving');
                //console.log('giving');
            }

    }
};

// Export role
module.exports = abilityGiveEnergy;
