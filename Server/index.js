'use strict';

var io = require('socket.io')();
io.listen(3000);
console.log("Server started on port 3000");


console.log("Running tests on question maker...");

var Game = require('./src/Game.js').class;

// Create a sample game
var sampleGame = new Game(io);
sampleGame.prepareListeners();