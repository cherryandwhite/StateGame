function prepareJoinUIListeners() {
    var newGameNameInput = document.getElementById("new-game_NameInput");
    var newGameGoalInput = document.getElementById("new-game_GoalInput");
    var newGameCreateButton = document.getElementById("new-game_CreateButton");

    var newGameNameDiv = document.getElementById("new-game_Name");
    var newGameGoalDiv = document.getElementById("new-game_Goal");
    var newGameButtonDiv = document.getElementById("new-game_Create");

    var joinGameCodeInput = document.getElementById("join-game_GameInput");
    var joinGameNameInput = document.getElementById("join-game_NameInput");
    var joinGameJoinButton = document.getElementById("join-game_JoinButton");

    var joinGameNameDiv = document.getElementById("join-game_Name");
    var joinGameCodeDiv = document.getElementById("join-game_Code");
    var joinGameButtonDiv = document.getElementById("join-game_Join");

    // Create handlers
    newGameNameInput.addEventListener('input', function() {
        if(newGameNameInput.value.length >= 3) {
            newGameGoalDiv.style.visibility = '';
        } else {
            newGameGoalDiv.style.visibility = 'hidden';
            newGameCreateButton.style.visibility = 'hidden';
        }
    });

    newGameGoalInput.addEventListener('input', function() {
        var value = newGameGoalInput.value;
        if (value != NaN && value >= 10 && value <= 50) {
            newGameCreateButton.style.visibility = '';
        } else {
            newGameCreateButton.style.visibility = 'hidden';
        }
    })

    newGameCreateButton.addEventListener('click', function() {
        api.createGame(newGameNameInput.value);
    })

    joinGameCodeInput.addEventListener('input', function() {
        if(joinGameCodeInput.value.length == 5) {
            joinGameNameDiv.style.visibility = '';
        } else {
            joinGameNameDiv.style.visibility = 'hidden';
            joinGameButtonDiv.style.visibility = 'hidden';
        }
    });

    joinGameNameInput.addEventListener('input', function() {
        if(joinGameNameInput.value.length >= 3) {
            joinGameButtonDiv.style.visibility = '';
        } else {
            joinGameButtonDiv.style.visibility = 'hidden';
        }
    });

    joinGameJoinButton.addEventListener('click', function() {
        api.joinGame(joinGameCodeInput.value, joinGameNameInput.value);
    })


    // Trigger the events now so that we hidew all that should be hidden
    var newGameNameEvent = new CustomEvent('input');
    newGameNameInput.dispatchEvent(newGameNameEvent);
    newGameGoalInput.dispatchEvent(new CustomEvent('input'));
    var joinGameCodeEvent = new CustomEvent('input');
    joinGameCodeInput.dispatchEvent(joinGameCodeEvent);
}