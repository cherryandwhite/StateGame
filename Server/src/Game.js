'use strict';


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
        var QuestionMaker = require('./QuestionMaker.js').class;
        this.questionGetter = new QuestionMaker();

        // Get a list of every state we have questions for
        this.states = this.questionGetter.getAllStates();

        // Save the socket that is the administrator of this rrom
        this.admin = null;

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

        // Append the socket to the players array
        this.players.push(socket);

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

        // The user will be answering the last question in the questions property of their socket
        var question = socket.questions[((socket.questions.length > 0) ? socket.questions.length - 1 : 0)];

        // See if the answer the user supplied is the same as the question's
        var userCorrect = (question.answer == answer);

        // If the user is right
        if (userCorrect) {

            // Add to their progress quantity
            socket.progress += 1;

            // Add this state to the list of states not to ask again
            socket.states.push(answer);
        }

        process.nextTick(function() {
            callback(userCorrect);
        })

    }

    /* Helper Methods */
    sendQuestionTo(socket) {

        // Get a question
        var question = self.questionGetter.nextQuestionForSocket(socket);
        
        // Make sure the question actually exists
        if (question != null) {

            // Add the question to the questions property of the socket
            if(socket.questions == undefined) {
                socket.questions = [question];
            } else {
                socket.questions.push(question);
            }

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
        for(var player in this.nsp.clients()) {
            usernames.push(player.username);
        }

        // Emit the event to the client
        socket.emit('players', usernames);
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

    prepareListeners() {

        var self = this;

        // Create one for when a socket joins the namespace (aka the game)
        this.nsp.on('connection', function(socket) {

            // The user joins with a nickname
            socket.on('join', function(username) {

                console.log('[event]: ' + username + ' asked to join');

                // Attempt to join the user with the name they gave
                self.joinUser(socket, username, function(success) {
                    console.log("[debug]: User joined!");
                    // If the user joined
                    if (success) {


                        // Save the list of states to the user's remaining property
                        socket.states = self.states;
                        console.log("States: " + socket.states);

                        // let the other users know that someone joined


                        self.nsp.emit('player_joined', username);
                        console.log("emitting player joined event");
                    }
                });
            });

            // The user answers a question
            socket.on('answer_question', function(answer) {

                // Check the answer
               
                    self.answer(socket, answer, function(correct) {

                        console.log("User answered question:\n" + socket.questions[socket.questions.length - 1].clue + "\nGave answer:\n" + answer + "They answered " + ((correct) ? "correctly" : "incorrectly"));

                        // Tell the user whether they were right or not
                        
                            socket.emit('answer_status', correct);
                      

                        // Tell all the users that his score was updated
                        
                            self.nsp.emit('player_score', socket.progress);
                        
                    });
                
            });

            // The user asks for a new question
            socket.on('next_question', function() {

                // Use the helper function
                self.sendQuestionTo(socket);

                // Push this to background
                process.nextTick(function() {});
            });

            // When the 'start_game' is sent, we'll send the first question to all the players
            socket.on('start_game', function() {

                // Verify the sender is the one that created this game
                if(!isAdmin(socket)) {
                    return;
                }

                // For each socket, send the next question
                for(var socket in nsp.clients()) {

                    // Use the helpoer function to send them their next question
                    self.sendQuestionTo(socket);
                }

                // Don't wait for this function to finish
                process.nextTick(function(){});

            });
        });
    }
}

exports.class = Game;