const os = require('os');
const storage = require('electron-json-storage');

storage.setDataPath(os.tmpdir() + "/com.isaiahnields.CSVtoSQL");

// loads tables into the tables list
function loadTables() {
    storage.getAll(function(error, data) {
        if (error) throw error;

        storage.keys(function(error, keys) {
            if (error) throw error;

            for (const key of keys) {
                addTableRow(data[key]);
            }
        });


    });
}

// adds a table to the tables list
function addTable() {

    document.getElementsByClassName('mdl-layout-title')[0].innerHTML = 'New Table';

    document.getElementById('table-container').style.display = 'block';
    document.getElementById('list-container').style.display = 'none';
}

// deletes a table from the tables list
function deleteTable() {


}

function test() {
    storage.set('Test', { tableName: "Test" , pathToCSV: "path/to/csv", columnTypes: { columnName: "hello" } }, function(error) {
        if (error) throw error;
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

    tableRow.appendChild(tableName);
    tableRow.appendChild(pathToCSV);

    document.getElementById('tables-list-body').appendChild(tableRow);
}

test();
loadTables();