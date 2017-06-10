class BottomBar {

    constructor(prefix) {

        // Save references to the different parts of the bar
        this.cardDiv = document.getElementById(prefix + "_Card");
        this.titleH2 = document.getElementById(prefix + "_Card_Title");
        this.textDiv = document.getElementById(prefix + "_Card_Text");
        this.progressbar = document.getElementById(prefix + "_Card_Loading");
        this.menuDiv = document.getElementById(prefix + "_Card_Menu");
        this.menuDivButton = document.getElementById(prefix + "_Card_Menu_Button");

        // When the button is pressed...
        this.menuDivButton.addEventListener("click", this.buttonPressed())

        // The default state is hiding the bar
        this.cardDiv.style.visibility = 'hidden';

        // The callback for when the button is pressed
        this.buttonCallback = null;
    }

    // Allow the bar to be shown
    show() {
        this.cardDiv.style.visibility = '';
    }

    // Allow the bar to be hidden
    hide() {
        this.cardDiv.style.visibility = 'hidden';
    }

    // Set the title
    setTitle(t) {
        this.titleH2.innerHTML = t;
    }

    // Set the main text content
    setText(t) {
        this.textDiv.innerHTML = t;
    }

    // Show the progress bar
    loading() {
        this.progressbar.style.visibility = '';
    }

    // Set the progress bar to hidden
    stopLoading() {
        this.progressbar.style.visibility = 'hidden';
    }

    // Show and hide the menu in the top right
    showMenu() {
        this.menuDiv.style.visibility = '';
    }

    // Hide the menu div
    hideMenu() {
        this.menuDiv.style.visibility = 'hidden';
    }

    // Set the text of the menu button
    setMenuButtonText(t) {
        this.menuDivButton.innerHTML = t;
    }

    // Shows a message
    showBasicMessage(title, text) {
        // Hide all the extras
        this.hideMenu();
        this.stopLoading();

        // Set the title and text property
        this.setTitle(title);
        this.setText(text);

        // Unhide the bar
        this.show();
    }

    // Shows a message with a callback for the button pressed
    showMessage(title, text, button, callback) {

        // Set the callback for button presses
        this.buttonCallback = callback;

        // Show/Hide some of the extras
        this.showMenu();
        this.stopLoading();

        // Show the title and text
        this.setTitle(title);
        this.setText(text);

        // Set the button
        this.setMenuButtonText(button);

        // Show the bar
        this.show();
    }

    // Shows a loading message
    showLoadingMessage(title, text) {

        // Hide the menu
        this.hideMenu();

        // Show the loading bar
        this.loading();

        // Set the title and text
        this.setTitle(title);
        this.setText(text);

        // Show the bar
        this.show();
    }

    // Helper method for the bar button
    buttonPressed() {
        if(this.buttonCallback != null) {
            this.buttonCallback();
        }
    }
}