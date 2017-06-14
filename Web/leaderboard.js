// This function takes JSON encoded data in the url and converts it to a format ready for the table view
function getPlayersArray() {

    // Read the window's location
    var url = window.location.href;

    // Decode to the human readable form
    url = decodeURI(url);

    // Get the part after ?META_V2_LEADERBOARD
    var components = url.split("?META_V2_LEADERBOARD=|");

    // Make sure the component was there
    if(components.length != 2) {
        return false;
    }

    // If we're all good, parse the metadata as json
    var leaderboard = JSON.parse(components[1]);

    // Get the players property
    var players = leaderboard.players;

    // return the Sorted players array
    return sortPlayersArray(players);
}

function sortPlayersArray(players) {
    return players.sort(function(a,b) {
        return b.score - a.score;
    });
}

// This function adds a row for each player to the tableview
function loadTableView(players) {

    // Get a reference to the tableview
    var tableview = document.getElementById("leaderBoardTable");    

    // Add a new row for each player
    for(var p = 1; p <= players.length; p++) {
        var player = players[p-1];

        // Create a json object for each column this row
        var obj = {
            columns: [
                {
                    content: p,
                    class: 'mdl-data-table__cell--numeric'
                },
                {
                    content: player.username
                },
                {
                    content: player.score
                }
            ]
        }

        // Use the json object to load into the table view
        addRowToTable(tableview, obj);
    }
}

// Puts a event listener on the play again button
function prepareUI() {
    document.getElementById("playAgainButton").addEventListener('click', function() {
        window.location = "index.html";
    });
}