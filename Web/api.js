function API(url) {
    this.url = url;
    this.room = -1;
    this.username = null;
    this.gameStarted = false;
    this.adminCode = null;
    this.isAdmin = false;
    this.mapEnabled = false;
    this.players = [];
    this.hasRecievedFirstQuestion = false;

    // Save the BottomBar helper library
    this.bottomBar = new BottomBar("bb");

    // hide the bar
    this.bottomBar.hide();

    // Create the players list
    this.rightBar = new SideBar("sb");

}

API.prototype.uiBindings = function() {

    // Add a click listener to the start game button
    document.getElementById("startGame_Button").addEventListener('click', (function() {
        this.startGame();
        document.getElementById("adminSplashPage").parentNode.removeChild(document.getElementById("adminSplashPage"));
    }).bind(this));
}

API.prototype.answer = function(answer) {
    
    // Emit the answer event
    this.socket.emit('answer_question', answer);

    // Stop allowing the map to be clicked on
    this.mapEnabled = false;
}

API.prototype.connect = function() {

    // Create the socket with the room the user gave
    this.socket = io(this.url + '/' + this.room);

    // Begin showing a spinner wheel

    // Connect to the server and register handlers
    this.loadHandlers();
}

API.prototype.loadHandlers = function() {

   this.socket.on('connect', (function() {

       // Log the event
       console.log("[log]: Socket connected");

       // Notify the delegate method
       connectedToRoom();
   }).bind(this));

   this.socket.on('question', (function(question) {

        // Show the question on the bottom bar
        console.log("[event]: Recieved question " + question.clue);
        this.bottomBar.showBasicMessage("Find the state", question.clue);

        // Allow the map to be clicked on again
        this.saveProp("mapEnabled", true);

        // If this is the first question, show the countdown clock
        if(!this.hasRecievedFirstQuestion) {

            // Begin the countdown timer
            countdownFrom(3);

            // Make sure this never happens again...
            this.hasRecievedFirstQuestion = true;
        }

   }).bind(this));

   this.socket.on('player_joined', (function(username) {
    
        // Check if this is actually us
       if(username == this.username) {
        
            // Show a simple welcome message
            this.bottomBar.showBasicMessage("Welcome " + this.username, "Click the state descibed by the question. Be the first to reach the goal set by the mod! Now...just wait for the game to start!");
      
            // Stop loading on the main div
            stopLoadingOnDiv("container");

            // Do extra if we're admin
            if(this.isAdmin) {
                    
                // Show the start game button
                document.getElementById("adminSplashPage").style.visibility = '';
            }
        }

       // Regardless, add them to the player list
       this.rightBar.addPlayer(username);

       // Also create a player object element for this
       this.players.push(new Player(username, 0));

   }).bind(this));

   this.socket.on('players', (function(players) {

       // Add the existing players to the sidebar
       console.log("Already here: " + players);
       for(var p = 0; p < players.length; p++) {
           var player = players[p];

           // Add the player to the right bar
            this.rightBar.addPlayer(player);

            // Also create a player object element for this
            this.players.push(new Player(player, 0));
       }
   }).bind(this));

   this.socket.on('answer_status', (function(correct) {

        // Present a popup with a message
        this.bottomBar.showMessage(((correct) ? "Correct!" : "Wrong!"), ((correct) ? "Keep the streak alive!" : "Better luck on the next one"), "Next Question", (function() {

            // Go to the next question
            this.nextQuestion();

        }).bind(this));
   }).bind(this));
   
   this.socket.on('player_score', (function(username, score) {

        // Update the right bar of this user
        this.rightBar.updatePlayerScore(username, score, 50);

        // Get the index of this player in the array
        var index = this.indexOfPlayerByUsername(username);

        // Make sure the user was actually in the array
        if(index < 0) { 
            return; 
        }

        // Update their score in the array
        this.players[index].score = score;

        console.log("Updated score at index " + index);
   }).bind(this));

   this.socket.on('game_over', (function() {
        
        // Create an object containing parts of the game data
        var data = {
            players: []
        }

        // Add all the players to the object
        data.players = this.players;

        // Encode the object as a string
        var savedDataString = JSON.stringify(data);

        // Redirect the user to the leaderboard page passing along this data
        window.location = "leaderboard.html?META_V2_LEADERBOARD=|" + savedDataString;

   }).bind(this));
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
    //document.getElementById("startGame").style.display = 'none';
}

API.prototype.saveProp = function(prop, val) {
    this[prop] = val;
}

API.prototype.indexOfPlayerByUsername = function(name) {
    for(var p = 0; p < this.players.length; p++) {
        if(name == this.players[p].username) {
            return p;
        }
    }

    return -1;
}