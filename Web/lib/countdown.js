function countdownFrom(val) {

    // Get the countdown div
    var countdownDiv = document.getElementById("countdown");

    // Make the countdown div visibile
    countdownDiv.style.visibility = '';

    // Get the span for the label
    var countdownText = document.getElementById("countdown_Number");

    // Keep track of where we are not
    var current = val;

    var x = setInterval(function() {

        // Decrement the counter
        current -= 1;

        // Change the countdown text
        countdownText.innerText = current;

        // If the countdown is now 0, switch to GO
        if(current == 0) {
            countdownText.innerHTML = "GO!";
        }

        // If the value is below 0, it's time to hide the GO!
        if(current < 0) {
            countdownDiv.parentNode.removeChild(countdownDiv);

            // Also meaning it's time to stop this loop
            clearInterval(x);
        }

    }, (val * 1000)); // Multiplied by 1000 because javascript counts in milliseconds
}