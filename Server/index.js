'use strict';

var io = require('socket.io')();
io.listen(3000);
console.log("Server started on port 3000");


console.log("Running tests on question maker...");

var Game = require('./src/Game.js').class;

io.on('connection', function(socket) {

    // If the socket makes a new game
    socket.on('new_game', function(mode, goal) {

        // Create the game
        var game = new Game(io, mode, goal);
        game.admin = socket;
        game.prepareListeners();

        // Emit an event to the client telling them the ID of their game
        socket.emit('game_created', game.id, game.adminCode);

        // Push this to background
        process.nextTick(function(){
            console.log("Finished processing game " + game.id);

        });

    });
});
