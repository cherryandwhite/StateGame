class RecordProcessor {

  constructor(socket) {
    this.socket = socket;
  }

  // Checks if the user is batting a thousand
  isBattingAThousand() {
    return (this.socket.progress == this.socket.questionsShown);
  }

  // A public variable containing all the relevant information to each award
  var awards = [
    {
      "id": "b1",
      "name": "Batted 1000!",
      "description": " didn't get a single question wrong all game!"
    },
    {
      "id": "sfr",
      "name": "Super fast response",
      "description": " answered a question in under 1 second!"
    },
    {
      "id": "ws",
      "name": "Weeklong Special",
      "description": " got 7 question right in a row"
    },
    {
      "id": "ss",
      "name": "Sharp Shooter",
      "description": " had the highest wrong/right ratio"
    }
  ]
}
