function loadCreditsTableView() {

    // Get the table view
    var tableview = document.getElementById("credits_Table");

    // Get the credits property of the credits object
    var credits = getCredits().credits;

    // Process each row
    for(var c = 0; c < credits.length; c++) {
        var credit = credits[c];

        // Create the row object
        var row = {
            "columns": [
                {
                    "content": ('<strong>' + credit.name + '</strong>')
                },
                {
                    "content": credit.creator
                },
                {
                    "content": ('<a href="' + credit.link + '">' + credit.license + '</a>')
                }
            ]
        }

        // Render the row in the tableview
        addRowToTable(tableview, row);
    }
}

function getCredits() {
    var credits = {
        "credits": [
            {
                "name": "jQuery",
                "creator": "JS Foundation and other contributors",
                "license": "Custom License",
                "link": "https://github.com/jquery/jquery/blob/master/LICENSE.txt"
            },
            {
                "name": "Material Design Lite",
                "creator": "Google",
                "license": "Apache 2.0 *",
                "link": "https://github.com/google/material-design-lite/blob/mdl-1.x/LICENSE"
            },
            {
                "name": "animate.css",
                "creator": "Daniel Eden",
                "license": "MIT",
                "link": "https://github.com/daneden/animate.css/blob/master/LICENSE"
            },
            {
                "name": "textillate.js",
                "creator": "Jordan Schroter",
                "license": "MIT",
                "link": "https://github.com/jschr/textillate/blob/master/LICENSE"
            },
            {
                "name": "Roboto Font",
                "creator": "Christian Robertson",
                "license": "Apache 2.0 *",
                "link": "http://www.apache.org/licenses/LICENSE-2.0"
            },
            {
                "name": "Socket.IO (Client & Server)",
                "creator": "Automattic",
                "license": "MIT",
                "link": "https://github.com/socketio/socket.io/blob/master/LICENSE"
            }
        ]
    }

    return credits;
}