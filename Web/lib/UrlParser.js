class UrlParser {

    constructor(url) {
        console.log(url);
        // Determine if metadata was passed
        this.containsMetadata = url.includes("?META");

        // Is the url valid
        this.valid = true;

        // Determine the version of the metadata (0 if none)'
        this.metadataVersion = 0;
        if (url.includes("?META_V2")) {
            this.metadataVersion = 2;
        } else if (url.includes("?META=V1")) {

            // Version 1 metadata explicitely tells the page to use the old dialog based setup
            this.metadataVersion = 1;
        }

        // If the metadata is version 2, do some special operations on it
        if (this.metadataVersion == 2) {

            // Determine if the user created or joined a new game on the last page
            this.lastAction = SenderActionTypes.None;
            if (url.includes("?META_V2_CREATE")) {
                this.lastAction = SenderActionTypes.Create;
            } else if (url.includes("?META_V2_JOIN")) {
                this.lastAction = SenderActionTypes.Join;
            }

            // Determine the Id (and possibly other properties) of the game to join
            this.gameId = null;
            this.username = null;
            this.adminCode = null;

            // Get the components of the url we'll be working on
            this.urlComponents = url.split("=|");

            // Make sure there are exactly two components
            if (this.urlComponents.length != 2) {
                this.valid = false;
                return;
            }

            // Get the second index
            this.urlComponent = this.urlComponents[1];

            // Break the component into parts separated by ~
            this.parameterUrlComponents = this.urlComponent.split("~");

            // Make sure we have two or three components
            if (!(this.parameterUrlComponents.length >= 2 && this.parameterUrlComponents.length <= 3)) {
                this.valid = false;
                return;
            }

            // The first component is the game id 
            this.gameId = this.parameterUrlComponents[0];

            // The second component is the username to join with
            this.username = this.parameterUrlComponents[1];

            // If we have three elements in the array, there is an admin code
            if (this.parameterUrlComponents.length == 3) {
                this.adminCode = this.parameterUrlComponents[2];
            }

        }
    }
}

var SenderActionTypes = {
    Create: "?META_V2_CREATE",
    Join: "?META_V2_JOIN",
    None: ""
}