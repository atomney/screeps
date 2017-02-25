var abilityBuildRoad = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // Look at current terrain
        var terrain = creep.room.lookForAt('terrain', creep.pos.x, creep.pos.y);
        // Is terrain swamp?
        if (terrain == 'swamp') {
            creep.room.createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);
        }
        creep.say('🚧 road');
    }
};

// Export role
module.exports = abilityBuildRoad;
