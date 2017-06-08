class TextInputModal {

    // Sets all strings to their default values
    // This method is the first call of every constructor
    defaultConstructors() {
        this.title = "";
        this.subtitle = "";
        this.submitButton = "Submit";
        this.cancelButton = "Cancel";
        this.label = "";
        this.id = "";
    }

    constructor(id, prompt, subtitle, label) {
        this.defaultConstructors();

        // Customize the modal
        this.id = id;
        this.title = prompt;
        this.subtitle = subtitle;
        this.label = label;
    }

    show() {

        // Apply the properties to the HTML
        document.getElementById("textInputModal_Title").innerHTML = this.title;
        document.getElementById("textInputModal_Subtitle").innerHTML = this.subtitle;
        document.getElementById("textInputModal_SubmitButton").innerHTML = this.submitButton;
        document.getElementById("textInputModal_CancelButton").innerHTML = this.cancelButton;
        document.getElementById("textInputModal_Label").innerHTML = this.label;
        document.getElementById("textInputModal_Stage").value = this.id;

        // Perform Modal Dialog setup operations even if they've been done before
        var dialog = document.getElementById('textInputModal');
    
        if (! dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        
        // Show the dialog
        dialog.showModal();
        
    }
}

// Setup handlers for the various modal types
function submitModalTextPopup() {

document.getElementById('textInputModal').close();

    // Call the callback which should have been defined
    modalTextPopupText(document.getElementById("textInputModal_Stage").value, document.getElementById("textInputModal_Input").value);
}

function cancelModalTextPopup() {

    document.getElementById('textInputModal').close();
    
    // Close the modal with jQuery
    $('#textInputModal').modal('close');
}