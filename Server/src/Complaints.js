class ComplaintProcessor {

  constructor() {
    this.storage = require('node-persist');
    this.storage.init({
      dir: 'data/complaints/'
    });
    var RandomLib = require('./Random.js').class;
    this.random = new RandomLib();
    // Structure
    /*
      {
        "username": "Brendan",
        "question": {
          "clue": "..."
        },
        "reason": "Spelling
      }
    }*/
  }
    saveComplaint(complaint) {
      this.storage.setItem(complaint.username + "_" + this.random.randomString(20), complaint);
    }
  }

  exports.class = ComplaintProcessor;
