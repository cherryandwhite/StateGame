class SideBar {

    constructor(prefix) {
        this.prefix = prefix;
        this.sidebar = document.getElementById(prefix + "_ListView");
    }

    addPlayer(playerName) {

        // Define the new list item
        var li = document.createElement('li');
        li.className = "mdl-list__item sideBarItem";
        li.id = (this.prefix + "_ListItem_" + playerName);

        // Create the avatar span
        var mainSpan = document.createElement('span');
        mainSpan.className = "mdl-list__item-primary-content";

        // Add the default score
        var playerScoreTag = document.createElement('p');
        playerScoreTag.id = (this.prefix + "_ListItem_" + playerName + '_Score')
        playerScoreTag.innerHTML = "0";
        playerScoreTag.className = "scoreTag"

        // Create the player name span (label)
        var playerNameSpan = document.createElement('p');
        playerNameSpan.innerHTML = playerName;
        playerNameSpan.className = "nameTag"

        // Organize all of it into one node
        mainSpan.appendChild(playerNameSpan);
        mainSpan.appendChild(playerScoreTag);

        li.appendChild(mainSpan);
       // li.appendChild(document.createElement('br'));
        

        /*
        var html  = '<li id="' + (this.prefix + "_ListItem_" + playerName) + '" class="mdl-list__item">';
            html += '   <span class="mdl-list__item-primary-content">';
            html += '       <i class="material-icons mdl-list__item-avatar">person</i>';
            html += '       <span>' + playerName + '</span>';
            html += '   </span>';
            html += '   <p id="' + (this.prefix + "_ListItem_" + playerName + '_Score') + '">...</p>';
            html += '</li>';
            */

        // Add this to the list
        this.sidebar.appendChild(li);
    }

    updatePlayerScore(playerName, playerScore, gameTarget) {
console.log((this.prefix + "_ListItem_" + playerName + '_Score'));
        // Set the innerHTML for the player's label using the prefix
        document.getElementById(this.prefix + "_ListItem_" + playerName + '_Score').innerHTML = playerScore + "/" + gameTarget;
   
    }
}