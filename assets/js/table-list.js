const storage = require('./storage');

function display(on)
{
    document.getElementById('table-list-container').style.display = on ? 'block' : 'none';
}

// loads tables into the tables list
function loadTables(callback)
{
    // load all table info from storage
    storage.storage.getAll(function(error, data)
    {
        if (error) throw error;

        // load all table keys from storage
        storage.storage.keys(function(error, keys)
        {
            if (error) throw error;

            // for each storage file, add a row to the tables list
            for (const key of keys)
            {
                loadTable(data[key], callback);
            }
        });
    });
}

// loads a specific table into the tables list
function loadTable(tableData, callback)
{
    // creates table row
    const tableRow = document.createElement('tr');
    tableRow.id = tableData['tableName'];
    tableRow.classList.add('table-list-row');

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
    document.getElementById('table-list-body').appendChild(tableRow);
}

// deletes all tables
function deleteTables()
{
    // clears storage
    storage.storage.clear(function (error)
    {
        // get the table list body from index.html
        const tableListBody = document.getElementById('table-list-body');

        // while the table list body has a child
        while (tableListBody.firstChild)
        {
            // remove the first child
            tableListBody.removeChild(tableListBody.firstChild);
        }
    });
}

// deletes the table with the specified name
function deleteTable(tableName)
{
    storage.storage.remove(tableName, function (error)
    {
        if (error) throw error;

        // removes the table from index.html
        document.getElementById(tableName).remove();
    });

}

// refreshes all tables in table list
function refreshTables()
{
    // get the table list body from index.html
    const tableListBody = document.getElementById('table-list-body');

    // while the table list body has a child
    while (tableListBody.firstChild)
    {
        // remove the first child
        tableListBody.removeChild(tableListBody.firstChild);
    }

    loadTables();
}

// checks if a table exists
function isTable(tableName)
{
    storage.storage.has(tableName, function (error, hasKey)
    {
        if (error) throw error;

        return hasKey;
    });
}


module.exports = {
    loadTables: loadTables,
    deleteTables: deleteTables,
    deleteTable: deleteTable,
    refreshTables: refreshTables,
    isTable: isTable,
    display: display
};