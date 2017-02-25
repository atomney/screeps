var abilityChangeSoldierState = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // Find hostile creeps
        var creeptargets = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        // Find hostile structures
        var structuretargets = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);

        if (creep.memory.attack && !creeptargets) {
            creep.memory.attack = false;
            creep.say('🛡️ guard');
        }
        if (!creep.memory.attack && creeptargets) {
            creep.memory.attack = true;
            creep.say('⚔️ attack');
        }
    }
};

// Export role
module.exports = abilityChangeSoldierState;
