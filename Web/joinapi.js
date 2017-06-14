function JoinAPI(url) {
    this.url = url;
    this.socket = io(this.url);
    this.roomStatusCallback = null;

}

JoinAPI.prototype.doesRoomExist = function(room, callback) {

    // Emit an event to the base of the server asking if the room exists
    this.socket.emit('does_room_exist', room);

    // Save the room status callback
    this.roomStatusCallback =  callback;
}

JoinAPI.prototype.loadHandlers = function() {

    var self = this;

    this.socket.on('room_status', function(exists) {
        if (self.roomStatusCallback != null) {
            self.roomStatusCallback(exists);
        }
    });

    this.socket.on('game_created', function(id, admin) {
        console.log("Game created with id " + id);
        window.location = "game.html?META_V2_CREATE=|" + id + "~" + self.adminUsername + "~" + admin;
    });
}

JoinAPI.prototype.createGame = function(name) {

    // Save the username of the creating user
    this.adminUsername = name;

    // Get the number of units (states or countries we're playing to)
    var target = Number(document.getElementById("new-game_GoalInput").value);

    // Emit the create event
    this.socket.emit('new_game', 1, target);

}

JoinAPI.prototype.joinGame = function(game, username) {
    window.location = "game.html?META_V2_JOIN=|" + game + "~" + username;
}