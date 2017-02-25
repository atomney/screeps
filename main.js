// Roles
var roleSoldier = require('role.soldier');
var roleConstructor = require('role.constructor');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleOmniCreep = require('role.omnicreep');
var roleCollector = require('role.collector');

// Main loop
module.exports.loop = function() {
    // Clear creeps memory every tick to save resources
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    //// Variables
    var rootroom = Game.spawns['ROOT'].room
    var controllerlevel = rootroom.controller.level
    //// End Variables

    //// Set variables for number of creeps in roles
    // Set variable "soldiers" to the current number of creeps with role "soldier"
    var soldiers = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
    // Set variable "constructors" to the current number of creeps with role "constructor"
    var constructors = _.filter(Game.creeps, (creep) => creep.memory.role == 'constructor');
    // Set variable "builders" to the current number of creeps with role "builder"
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    // Set variable "upgraders" to the current number of creeps with role "upgrader"
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    // Set variable "omnicreeps" to the current number of creeps with role "omnicreep"
    var omnicreeps = _.filter(Game.creeps, (creep) => creep.memory.role == 'omnicreep');
    // Set variable "collectors" to the current number of creeps with role "collector"
    var collectors = _.filter(Game.creeps, (creep) => creep.memory.role == 'collector');
    ////

    //// TESTING

    /*
    var spawnx = Game.spawns['ROOT'].pos.x
    var spawny = Game.spawns['ROOT'].pos.y
    console.log('Spawn Position: ' + spawnx + ',' + spawny);
    var testpositionx = spawnx - 2
    console.log('Test Position X: ' + testpositionx);
    var testpositiony = spawny - 2
    console.log('Test Position Y: ' + testpositiony);
    */

    // Print level of controller to console
    //console.log('Controller Level: ' + controllerlevel)

    /*    for (var key in Room.controller) {
          console.log('STUFF: ' + key);
        }
    */
    // Find number of extensions
    /*
    var extensions = rootroom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION);
                      }})
    console.log('Number of Extensions: ' + extensions.length);
    */

    //// END TESTING


    //// Activate safe mode if available
    rootroom.controller.activateSafeMode();
    //console.log('safemode activated');
    //console.log('Safemode Activated for: ' rootroom);
    ////

    //// MAIN CONSOLE LOG
    console.log('Omnicreeps:' + omnicreeps.length + ',' + 'Constructors:' + constructors.length + ',' + 'Soldiers:' + soldiers.length + ',' + 'Upgraders:' + upgraders.length);
    console.log('Room Energy: ' + rootroom.energyAvailable);
    //// END MAIN CONSOLE LOG

    //// Spawn creeps if we don't have enough
    // Spawn a creep with role omnicreep if var "omnicreeps" is less than specified
    if (omnicreeps.length < 10 && rootroom.energyAvailable > 799) {
        var newName = Game.spawns['ROOT'].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, CARRY, CARRY], undefined, {
            role: 'omnicreep', size: 'Mk5'
        });
        console.log('Spawning new omnicreep Mk5: ' + newName);
    }
    // Spawn a creep with role omnicreep if var "omnicreeps" is less than specified
    if (omnicreeps.length < 9 && rootroom.energyAvailable > 549) {
        var newName = Game.spawns['ROOT'].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, {
            role: 'omnicreep', size: 'Mk4'
        });
        console.log('Spawning new omnicreep Mk4: ' + newName);
    }
    // Spawn a creep with role omnicreep if var "omnicreeps" is less than specified
    else if (omnicreeps.length < 7 && rootroom.energyAvailable > 499) {
        var newName = Game.spawns['ROOT'].createCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], undefined, {
            role: 'omnicreep', size: 'Mk3'
        });
        console.log('Spawning new omnicreep Mk3: ' + newName);
    }
    // Spawn a creep with role omnicreep if var "omnicreeps" is less than specified
    else if (omnicreeps.length < 5 && rootroom.energyAvailable > 399) {
        var newName = Game.spawns['ROOT'].createCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], undefined, {
            role: 'omnicreep', size: 'Mk2'
        });
        console.log('Spawning new omnicreep Mk2: ' + newName);
    }
    // Spawn a creep with role omnicreep if var "omnicreeps" is less than specified
    else if (omnicreeps.length < 4 && rootroom.energyAvailable > 299) {
        var newName = Game.spawns['ROOT'].createCreep([WORK, CARRY, CARRY, MOVE, MOVE], undefined, {
            role: 'omnicreep', size: 'Mk1'
        });
        console.log('Spawning new omnicreep Mk1: ' + newName);
    }
    // Spawn a creep with role contstructor if var "constructors" is less than specified
    else if (constructors.length < 4 && rootroom.energyAvailable > 299) {
        var newName = Game.spawns['ROOT'].createCreep([WORK, CARRY, MOVE, MOVE], undefined, {
            role: 'constructor', size: 'Mk1'
        });
        console.log('Spawning new constructor: ' + newName);
    }
    // Spawn a creep with role soldier if var "soldiers" is less than specified
    else if (soldiers.length < 2 && omnicreeps.length > 7) {
        var newName = Game.spawns['ROOT'].createCreep([ATTACK, ATTACK, MOVE, MOVE], undefined, {
            role: 'soldier', size: 'Mk1'
        });
        console.log('Spawning new soldier: ' + newName);
    }
    // Spawn a creep with role soldier if var "soldiers" is less than specified
    else if (soldiers.length < 4 && omnicreeps.length > 9 && rootroom.energyAvailable > 390) {
        var newName = Game.spawns['ROOT'].createCreep([ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE], undefined, {
            role: 'soldier', size: 'Mk2'
        });
        console.log('Spawning new soldier Mk2: ' + newName);
    }
    // Spawn a creep with role soldier if var "soldiers" is less than specified
    else if (soldiers.length < 6 && omnicreeps.length > 9 && rootroom.energyAvailable >= 800) {
        var newName = Game.spawns['ROOT'].createCreep([RANGED_ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {
            role: 'soldier', size: 'Mk3'
        });
        console.log('Spawning new soldier Mk3: ' + newName);
    }
    // Spawn a creep with role upgarder if var "upgraders" is less than specified
    else if (upgraders.length < 1) {
        var newName = Game.spawns['ROOT'].createCreep([WORK, CARRY, MOVE], undefined, {
            role: 'upgrader', size: 'Mk1'
        });
        console.log('Spawning new upgrader: ' + newName);
    }
    // Spawn a creep with role collector if var "collectors" is less than specified
    else if (collectors.length < 0 && rootroom.energyAvailable >= 450) {
        var newName = Game.spawns['ROOT'].createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE], undefined, {
            role: 'collector', size: 'Mk1'
        });
        console.log('Spawning new collector: ' + newName);
    }

    ////


    // Visualize that a creep is being spawned with emoji 🛠️
    if (Game.spawns['ROOT'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['ROOT'].spawning.name];
        Game.spawns['ROOT'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['ROOT'].pos.x + 1,
            Game.spawns['ROOT'].pos.y, {
                align: 'left',
                opacity: 0.8
            });
    }

    // For loop to give creeps jobs
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        // If creep role = soldier run role soldier
        if (creep.memory.role == 'soldier') {
            roleSoldier.run(creep);
        }
        // If creep role = constructor run role constructor
        if (creep.memory.role == 'constructor') {
            roleConstructor.run(creep);
        }
        // If creep role = builder run role builder
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        // If creep role = upgrader run role upgrader
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        // If creep role = omnicreep run role omnicreep
        if (creep.memory.role == 'omnicreep') {
            roleOmniCreep.run(creep);
        }
        // If creep role = collector run role collector
        if (creep.memory.role == 'collector') {
            roleCollector.run(creep);
        }
    }
}
