var config = {
    name: "State Game",
    server: "http://localhost:3000"
}

// Utility method for checking whether this is embedded in an electron app
function isElectron() {

    // Get the url
    var url = window.location.href;

    // Check if it has something in it
    return (url.includes("?electron=true"))
}
