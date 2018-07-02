const os = require('os');
const fs = require('fs');
const storage = require('electron-json-storage');
const {dialog} = require('electron').remote;



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

    // adds an event listener to table row
    tableRow.addEventListener('click', function (element) {showTable(element.target.parentNode.firstChild.innerText);});

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

// shows the table editor and hide the table list
function loadTableEditor(tableData)
{
    // show the table editor container and save button
    document.getElementById('table-editor-container').style.display = 'block';
    document.getElementById('save-button').style.display = 'block';

    // hide the table list container
    document.getElementById('table-list-container').style.display = 'none';

    const tableName = document.getElementById('table-name');
    const pathToCSV = document.getElementById('path-to-csv');

    // if loading an existing table
    if (tableData)
    {
        // load in the data
        tableName.value = tableData['tableName'];
        pathToCSV.value = tableData['pathToCSV'];

        // remove the hint text from the inputs
        tableName.parentNode.classList.add('is-dirty');
        pathToCSV.parentNode.classList.add('is-dirty');
    }
    else
    {
        tableName.value = '';
        pathToCSV.value = '';

        tableName.parentNode.classList.remove('is-dirty');
        pathToCSV.parentNode.classList.remove('is-dirty');
    }
}

/* The functions below are called when buttons are pressed in index.html */

function addTable()
{
    loadTableEditor();
}

function showTable(tableName)
{
    // get the table data from storage
    storage.get(tableName, function (error, data) {

        if (error) throw error;

        loadTableEditor(data);

    });
}

function exportTables()
{

}

// runs when the document loads
document.addEventListener("DOMContentLoaded", function ()
{
    // adds event listeners to the add and export floating action buttons
    document.getElementById('add-button').addEventListener('click', addTable);
    document.getElementById('export-button').addEventListener('click', exportTables);

    // loads the tables that the user has created
    loadTables();
});