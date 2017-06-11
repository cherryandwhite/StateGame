'use strict';


class Game {

    constructor(io) {
        // Generate a ID for the game
        this.id = this.randomString(5);

        // Generate the admin join password
        // ... Any socket which passes this random string gains admin privlidges
        this.adminCode = this.randomString(10);

        console.log("New game generated with id: " + this.id);

        // Keep an array of the past questions
        this.questions = [];

        // Keep the array of users
        this.players = [];

        // Create a namespace in the Socket.IO io for the game id
        this.nsp = io.of('/' + this.id);

        // Create an instance of the question getting helper library
        var QuestionMaker = require('./QuestionMaker.js').class;
        this.questionGetter = new QuestionMaker();

        // Get a list of every state we have questions for
        this.states = this.questionGetter.getAllStates();

        // Save the socket that is the administrator of this rrom
        this.admin = null;

        // Whether or not the game has been started
        this.started = false;

    }
    /*
    class Game {

        constructor(io) {

            // Generate a ID for the game
            this.id = this.randomString(5);

            console.log("New game generated with id: " + this.id);

            // Keep an array of the past questions
            this.questions = [];

            // Keep the array of users
            this.players = [];

            // Create a namespace in the Socket.IO io for the game id
            this.nsp = io.of('/' + this.id);

            // Create an instance of the question getting helper library
            var QuestionMaker = require('./QuestionMaker.js');
            this.questionGetter = new QuestionMaker();

            // Get a list of every state we have questions for
            var states = this.questionGetter.getAllStates();
        }
    */


    // Called to join a socket to the game
    joinUser(socket, username, callback) {

        // Make sure the username isn't taken
        if (this.usernameAvailable(username) == false) {
            /*process.nextTick(function() {
                callback(false);
            });*/

            callback(false);
        }

        // Add the username to the socket
        socket.username = username;
        socket.progress = 0;
        //this.saveSocket(socket);

        // Append the socket to the players array
        //this.players.push(socket);

        // Let all the other clients know a new player joined...

        // Do that here

        // All good to go!
        /*
        process.nextTick(function() {
            console.log("1");
            callback(true);
        });*/
        callback(true);
    }

    // Called when a user answers a question
    answer(socket, answer, callback) {

        console.log("DEBUG:" + this.text);

        // The user will be answering the last question in the questions property of their socket
        var question = socket.questions[((socket.questions.length > 0) ? socket.questions.length - 1 : 0)];

        // See if the answer the user supplied is the same as the question's
        var userCorrect = (question.answer == answer);

        // If the user is right
        if (userCorrect) {

            // Add to their progress quantity
            socket.progress += 1;

            console.log(socket.username + " now has " + socket.progress);

            // Add this state to the list of states not to ask again
            socket.states.push(answer);

            // Save the socket
            this.saveSocket(socket);

            // Tell everyone that their score is now height
            this.nsp.emit('player_score', socket.username, socket.progress);
        }

        // Emit the status of that question to the user
        socket.emit('answer_status', userCorrect);

        process.nextTick(function() {
            callback(userCorrect);
        })

    }

    /* Helper Methods */
    sendQuestionTo(socket) {

        // Get a question
        var question = this.questionGetter.nextQuestionForSocket(socket);
        
        // Make sure the question actually exists
        if (question != null) {

            // Add the question to the questions property of the socket
            if(socket.questions == undefined) {
                socket.questions = [question];
            } else {
                socket.questions.push(question);
            }

            // Save the socket
            this.saveSocket(socket);

            // Emit an event to the user with the new question
            socket.emit('question', question);
        }

        // Do this in the background...
        process.nextTick(function(){});
    }

    sendAllConnectedUsersToSocket(socket) {

        // Create an array of all the joined usernames
        var usernames = [];

        // Loop over every client in the game
        for(var key in this.nsp.connected) {
            var player = this.nsp.connected[key];
           
            if(player.username != null && player.username != undefined) {
               // if(player.username != socket.username) {
                    console.log(player.username + " was already in the game...");
                    usernames.push(player.username);
                //}
            }
        }

        // Emit the event to the client
        console.log("Emitting players event...");
        console.log(typeof(usernames));
        socket.emit('players', usernames);
    }

    sockets() {
        var sockets = [];
         for(var key in this.nsp.connected) {
            var player = this.nsp.connected[key];
           console.log(player.username);
            if(player.username != null && player.username != undefined) {
                console.log(player.username);
                sockets.push(player);
            }
         }

         return sockets;
    }

    // Utility method to generate a random string of a given length
    randomString(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;

    }

    // Utility method to make sure a name isn't already taken
    usernameAvailable(name) {
        
        for (var i = 0; i < this.players.length; i++) {
            console.log(JSON.stringify(this.players[i].username));
            if (this.players[i].username == name) {
                return false;
            }
        }
        return true;
    }

    // Gets the question for an ID number
    // NOT SURE I NEED THIS ANYMORE
    questionForId(id) {
        for (var q = this.questions.length - 1; q >= 0; q--) {
            if (this.questions[q].id == id) {
                return questions[q];
            }
        }

        return null;
    }

    // Utility method for seeing if a socket is the administrator of this room
    isAdmin(socket) {
        return (this.admin.id == socket.id);
    }


    saveSocket(socket) {
        this.nsp.connected[socket.id] = socket;
    }

    catchUpUser(socket) {

        // Send the user their first question
        this.sendQuestionTo(socket);

        // Send the scores of each player individually
        var sockets = this.sockets();
        console.log(sockets.length);
        for(var i = 0; i < sockets.length; i++) {
            var s = sockets[i];
            console.log("Catching up with " + s.username + " who has " + s.progress);
            socket.emit('player_score', s.username, s.progress);
            
        }

        
    }

    prepareListeners() {

        //var self = this;

        this.text = "123";

        // Create one for when a socket joins the namespace (aka the game)
        this.nsp.on('connection', (function(socket) {

            console.log("TXT: "+ this.text);
            // The user joins with a nickname
            socket.on('join', (function(username) {

                console.log("Text: "+ this.text);

                console.log('[event]: ' + username + ' asked to join');

                // Attempt to join the user with the name they gave
                //self.joinUser(socket, username, function(success) {
                    socket.username = username;
        socket.progress = 0;
                    console.log("[debug]: User joined!");
                    
                    // If the user joined
                    


                        // Save the list of states to the user's remaining property
                        //socket.states = self.states;
                        socket.states = this.states;
                        console.log("States: " + socket.states);

                        // Save the changes to this socket
                        this.saveSocket(socket);

                        // let the other users know that someone joined
                       // self.nsp.emit('player_joined', username);
                       this.nsp.emit('player_joined', username);
                       
                        // If the game is already started, catch this user up
                        if(this.started) {
                            this.catchUpUser(socket);
                        }

                        
                        process.nextTick(function(){console.log("DONE")});
        
            }).bind(this));

            // The user answers a question
            socket.on('answer_question', (function(answer) {

                // Check the answer
               
                   // self.answer(socket, answer, function(correct) {
this.answer(socket, answer, (function(correct) {
                        console.log("User answered question:\n" + socket.questions[socket.questions.length - 1].clue + "\nGave answer:\n" + answer + "They answered " + ((correct) ? "correctly" : "incorrectly"));

                        // Tell the user whether they were right or not
                        
                            socket.emit('answer_status', correct);
                      

                        // Tell all the users that his score was updated
                        
                            //self.nsp.emit('player_score', socket.progress);
                        this.nsp.emit('player_score', socket.progress);
                    }).bind(this));
                
            }).bind(this));

            // The user asks for a new question
            socket.on('next_question', (function() {

                // Use the helper function
                //self.sendQuestionTo(socket);
                this.sendQuestionTo(socket);

                // Push this to background
                process.nextTick(function() {});

            }).bind(this));

            // When the 'start_game' is sent, we'll send the first question to all the players
            socket.on('start_game', (function() {

                // Save the fact that the game started
                //self.saveGameStarted();
                this.started = true;

                // For each socket, send the next question
                /*for(var key in self.nsp.connected) {
                    var socket = self.nsp.connected[key];
                    // Use the helpoer function to send them their next question
                    self.sendQuestionTo(socket);
                }*/
                for(var key in this.nsp.connected) {
                    var socket = this.nsp.connected[key];
                    // Use the helpoer function to send them their next question
                    this.sendQuestionTo(socket);
                }

                // Don't wait for this function to finish
                process.nextTick(function(){
                    
                });

            }).bind(this));

            // If a user asks to become the admin 
            socket.on('request_admin', function(code) {

            });

            // last but not least, send all the currently connected users to show them if their friends have joined yet
            //self.sendAllConnectedUsersToSocket(socket);
this.sendAllConnectedUsersToSocket(socket);

            // Push it to the background
            process.nextTick(function(){
                console.log("Finished setting up " + socket.id);
            });
        }).bind(this));
    }
/*
    saveGameStarted() {
        this.started = true;
    }

    isStarted() {
        return this.started;

    }*/
}

exports.class = Game;