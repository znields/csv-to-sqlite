const os = require('os');
const fs = require('fs');
const storage = require('electron-json-storage');
const {dialog} = require('electron').remote;

storage.setDataPath(os.tmpdir() + "/com.isaiahnields.CSV -> SQL");

// loads tables into the tables list
function loadTables()
{
    // load all table info from storage
    storage.getAll(function(error, data)
    {
        if (error) throw error;

        // load all table keys from storage
        storage.keys(function(error, keys)
        {
            if (error) throw error;

            // for each storage file, add a row to the tables list
            for (const key of keys)
            {
                addTableRow(data[key]);
            }
        });
    });
}

// adds a row to the tables list
function addTableRow(tableData)
{
    // creates table row
    const tableRow = document.createElement('tr');

    // creates table name
    const tableName = document.createElement('td');
    tableName.innerText = tableData['tableName'];
    tableName.classList.add('mdl-data-table__cell--non-numeric');

    // creates path to table file
    const pathToCSV = document.createElement('td');
    pathToCSV.innerText = tableData['pathToCSV'];

    // adds the table name and path to csv to the table row
    tableRow.appendChild(tableName);
    tableRow.appendChild(pathToCSV);

    // append the table row to the tables list
    document.getElementById('tables-list-body').appendChild(tableRow);
}

// adds or edits an existing table
function showTable(tableName)
{
    if (!tableName) document.getElementsByClassName('mdl-layout-title')[0].innerHTML = 'New Table';

    document.getElementById('table-container').style.display = 'block';
    document.getElementById('list-container').style.display = 'none';
}

function test() {
    storage.set('Test', { tableName: "Test" , pathToCSV: "path/to/csv", columnTypes: { columnName: "hello" } }, function(error) {
        if (error) throw error;
    });
}





function addTable()
{
    showTable();

}