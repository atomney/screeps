var abilityAttackStructures = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var structuretargets = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
        if (structuretargets) {
            if (creep.attack(structuretargets) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structuretargets, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
                creep.say('⚔️ attack');
            }
        }
    }
};

// Export role
module.exports = abilityAttackStructures;
