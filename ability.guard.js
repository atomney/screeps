var abilityGuard = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var guard = creep.pos.findClosestByPath(FIND_FLAGS, {
            filter: function(object) {
                return (Game.flags['GUARD']);
            }
        });
        creep.moveTo(guard);
        creep.say('🛡️ guard');
        // Patrol in little circles
        //creep.move(_.sample([TOP, TOP_RIGHT, RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT]))
    }
};

// Export role
module.exports = abilityGuard;
