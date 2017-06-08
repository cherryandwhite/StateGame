function API(url) {
    this.room = -1;
}

API.prototype.connect = function() {

    // Create the socket with the room the user gave
    this.socket = io('http://localhost:3000/' + this.room);

    // Begin showing a spinner wheel

    // Connect to the server and register handlers
    this.loadHandlers();
}

API.prototype.loadHandlers = function() {
   this.socket.on('connect', function() {

       // Log the event
       console.log("[log]: Socket connected");

       // Notify the delegate method
       connectedToRoom();
   });

   this.socket.on('question', function(question) {
    console.log("Loaded question: " + question.clue);
   });
}

API.prototype.joinWithUsername = function(username) {
    this.username = username;
    this.socket.emit('join', username);
}