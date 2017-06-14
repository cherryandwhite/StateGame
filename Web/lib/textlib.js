function spacedLetters(t) {
    var s = "";
    for ( var i = 0; i < t.length; i++ ) {
        if(i != 0) {
            s += " ";
        }

        s += t.charAt(i);
    }
    return s;
}