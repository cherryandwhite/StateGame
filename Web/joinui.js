function prepareJoinUIListeners() {
    var newGameNameInput = document.getElementById("new-game_NameInput");
    var newGameTermsInput = document.getElementById("new-game_TermsCheckbox");
    var newGameCreateButton = document.getElementById("new-game_CreateButton");

    var newGameNameDiv = document.getElementById("new-game_Name");
    var newGameTermsDiv = document.getElementById("new-game_Terms");
    var newGameButtonDiv = document.getElementById("new-game_Create");

    var joinGameCodeInput = document.getElementById("join-game_GameInput");
    var joinGameNameInput = document.getElementById("join-game_NameInput");
    var joinGameJoinButton = document.getElementById("join-game_JoinButton");

    var joinGameNameDiv = document.getElementById("join-game_Name");
    var joinGameCodeDiv = document.getElementById("join-game_Code");
    var joinGameButtonDiv = document.getElementById("join-game_Join");

    // Create handlers
    newGameNameInput.addEventListener('input', function() {
        console.log(newGameNameInput.value);
        if(newGameNameInput.value.length >= 3) {
            newGameTermsDiv.style.visibility = '';
        } else {
            newGameTermsDiv.style.visibility = 'hidden';
            newGameCreateButton.style.visibility = 'hidden';
        }
    });

    newGameTermsInput.addEventListener('change', function() {
        if(newGameTermsInput.checked) {
            newGameCreateButton.style.visibility = ''
        } else {
            newGameCreateButton.style.visibility = 'hidden';
        }
    });
    
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
    var joinGameCodeEvent = new CustomEvent('input');
    joinGameCodeInput.dispatchEvent(joinGameCodeEvent);
}