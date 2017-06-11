function API(url) {
    this.room = -1;
    this.username = null;
    this.gameStarted = false;
    this.adminCode = null;
    this.isAdmin = false;
    this.mapEnabled = false;

    // Save the BottomBar helper library
    this.bottomBar = new BottomBar("bb");

    // hide the bar
    this.bottomBar.hide();

    // Create the players list
    this.rightBar = new SideBar("sb");

}

API.prototype.uiBindings = function() {

    var self = this;

    // Add a click listener to the start game button
    document.getElementById("startGame_Button").addEventListener('click', function() {
        self.startGame();
    });
}

API.prototype.answer = function(answer) {
    
    // Emit the answer event
    this.socket.emit('answer_question', answer);

    // Stop allowing the map to be clicked on
    this.mapEnabled = false;
}

API.prototype.connect = function() {

    // Create the socket with the room the user gave
    this.socket = io('http://localhost:3000/' + this.room);

    // Begin showing a spinner wheel

    // Connect to the server and register handlers
    this.loadHandlers();
}

API.prototype.loadHandlers = function() {

    // Create a reference to the "this" object
    var self = this;

   this.socket.on('connect', function() {

       // Log the event
       console.log("[log]: Socket connected");

       // Notify the delegate method
       connectedToRoom();
   });

   this.socket.on('question', function(question) {

        // Show the question on the bottom bar
        console.log("[event]: Recieved question " + question.clue);
        self.bottomBar.showBasicMessage("Find the state", question.clue);

        // Allow the map to be clicked on again
        self.saveProp("mapEnabled", true);

   });

   this.socket.on('player_joined', function(username) {
    
        // Check if this is actually us
       if(username == self.username) {
        
            // Show a simple welcome message
            self.bottomBar.showBasicMessage("Welcome " + self.username, "How to play: Click the state descibed by the question. Be the first to get all 50 states!");
      
            // Stop loading on the main div
            stopLoadingOnDiv("container");

            // Do extra if we're admin
            if(self.isAdmin) {
                    
                // Show the start game button
                document.getElementById("startGame").style.visibility = '';
            }
        }

       // Regardless, add them to the player list
       self.rightBar.addPlayer(username);

   });

   this.socket.on('players', function(players) {

       // Add the existing players to the sidebar
       console.log("Already here: " + players);
       for(var p = 0; p < players.length; p++) {
           var player = players[p];
            self.rightBar.addPlayer(player)
       }
   });

   this.socket.on('answer_status', function(correct) {

        // Present a popup with a message
        self.bottomBar.showMessage(((correct) ? "Correct!" : "Wrong!"), ((correct) ? "Keep the streak alive!" : "Better luck on the next one"), "Next Question", function() {

            // Go to the next question
            self.nextQuestion();

        });
   });
   
   this.socket.on('player_score', function(username, score) {

        // Update the right bar of this user
        self.rightBar.updatePlayerScore(username, score, 50);
   });
}

API.prototype.nextQuestion = function() {
    this.socket.emit('next_question');
}

API.prototype.joinWithUsername = function(username) {
    this.username = username;
    this.socket.emit('join', username);
}

API.prototype.becomeAdmin = function() {
    this.isAdmin = true;

    // Get the actual privlidges from the server
    this.socket.emit('request_admin', this.adminCode);
}

API.prototype.startGame = function() {

    // Emit the start game event
    this.socket.emit('start_game');

    // Hide the start game button
    document.getElementById("startGame").style.display = 'none';
}

API.prototype.saveProp = function(prop, val) {
    this[prop] = val;
}