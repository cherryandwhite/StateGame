function loadOnDiv(divId) {

    // Create a div with the background
    var backgroundDiv = document.createElement('div');
    backgroundDiv.style.backgroundColor = 'gray';
    backgroundDiv.id = "spinner_" + divId;

    // Add a progress spinner
    var spinner = document.createElement('div');
    spinner.className = "mdl-spinner mdl-js-spinner is-active";

    // Add the progress spinner to the background div
    backgroundDiv.appendChild(spinner);

    // Set the background div to be on top
    backgroundDiv.style.zIndex = 1000;

    // Add the background div to the main div
    document.getElementById(divId).appendChild(backgroundDiv);

}

function stopLoadingOnDiv(divId){

    // Get the div inside that div
    var loadingDiv = document.getElementById("spinner_" + divId);

    // remove the div
    loadingDiv.parentNode.removeChild(loadingDiv);
}