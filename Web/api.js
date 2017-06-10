function API(url) {
    this.room = -1;
    this.username = null;

    // Save the BottomBar helper library
    this.bottomBar = new BottomBar("bb");

    // hide the bar
    this.bottomBar.hide();

    // Create the players list
    this.rightBar = new SideBar("sb");

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
   });

   this.socket.on('player_joined', function(username) {
       // Check if this is actually us
       if(username == this.username) {
        
            // Show a simple welcome message
            self.bottomBar.showBasicMessage("Welcome " + this.username, "How to play: Click the state descibed by the question. Be the first to get all 50 states!");
       }

       // Regardless, add them to the player list
       self.rightBar.addPlayer(username);

   });

   this.socket.on('players', function(players) {

       // Add the existing players to the sidebar
       for(var player in players) {
            self.rightBar.addPlayer(player)
       }
   })
}

API.prototype.joinWithUsername = function(username) {
    this.username = username;
    this.socket.emit('join', username);
}