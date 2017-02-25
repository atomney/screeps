var roleTower = {

    /** @param {Game} game **/
    tick: function() {
        towers = Game.spawns['ROOT'].room.find(FIND_MY_STRUCTURES, {
                    filter: { structureType: STRUCTURE_TOWER }
                })
        _.forEach(towers, function(tower){
            // Find the closest structure
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });

            // Repair closest structure with the most damage
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

            // Attack closest hostile creep
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        })
	}
};

// Export role
module.exports = roleTower;
