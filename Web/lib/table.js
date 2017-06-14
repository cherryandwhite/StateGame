// Helper function for adding a row to a table
// Data array should look like: { columns: [ {content: "HelloWorld", class:"customClass"}]}
function addRowToTable(table, dataArray) {

    // Create the new row
    var row = table.insertRow(-1); // (-1 means the last index)

    // Loop over every column in the dataArray
    var cols = dataArray.columns;
    for(var c = 0; c < cols.length; c++) {
        
        // Create a new table cell
        var cell = row.insertCell(c);

        // Set the class of the cell
        if(cols[c].class != undefined && cols[c].class != null) {
            cell.className = cols[c].class;
        }

        // Set the innerHTML content
        cell.innerHTML = cols[c].content;
    }
}