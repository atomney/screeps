var abilityGoToSource = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // Go to closest source by path
        var sources = creep.pos.findClosestByPath(FIND_SOURCES);
        if(sources[0].energy != 0) {
           if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
           creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}}, {reusePath: 50});
           creep.say('🔄 harvest0');
           }
         } else if (sources[1].energy != 0) {
           if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
           creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}}, {reusePath: 50});
           creep.say('🔄 harvest1');
           }
         } else if (sources[2].energy != 0) {
           if(creep.harvest(sources[2]) == ERR_NOT_IN_RANGE) {
           creep.moveTo(sources[2], {visualizePathStyle: {stroke: '#ffaa00'}}, {reusePath: 50});
           creep.say('🔄 harvest2');
           } else {
             if(creep.harvest(sources[3]) == ERR_NOT_IN_RANGE) {
             creep.moveTo(sources[3], {visualizePathStyle: {stroke: '#ffaa00'}}, {reusePath: 50});
             creep.say('🔄 harvest3');
             }
           }
    }
};

// Export role
module.exports = abilityGoToSource;
