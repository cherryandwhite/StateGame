class WebviewConnector {
    constructor() {
        this.messageCallback = null;
        this.messagePrefix = "<WebviewConnector>: ";
    }

    // This method is triggered by the Electron connector when inserting a message into the page
    messageRecieved(message) {

        // Check whether we have defined a callback for when messages are recieved
        if(this.messageCallback != null) {
            this.messageCallback(message);
        }
    }

    // This method emits a console message that the Electron connector will be listening for
    sendMessage(msg) {
        
        // Log a message with the prefix constant defined above
        console.log(this.messagePrefix + msg);
    }
}