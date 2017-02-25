var abilityChangeState = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // Change state of creep after inventory empty
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 building');
        }
    }
};

// Export role
module.exports = abilityChangeState;
