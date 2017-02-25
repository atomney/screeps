var abilityRepair = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // Structures that need to be repaired
        var stuffToRepair = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(object) {
                return (object.hits < object.hitsMax);
            }
        });
        // Repair Stuff
        if (stuffToRepair) {
            creep.moveTo(stuffToRepair, {
                visualizePathStyle: {
                    stroke: '#ffffff'
                }
            }, {
                reusePath: 50
            });
            creep.repair(stuffToRepair);
            creep.say("🚑 repair");
        }
    }
};

// Export role
module.exports = abilityRepair;
