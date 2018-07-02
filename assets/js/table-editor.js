const {dialog} = require('electron').remote;



storage.setDataPath(os.tmpdir() + "/com.isaiahnields.csv-to-sql");

function showTableList()
{
    // hide the table editor container and save button
    document.getElementById('table-editor-container').style.display = 'none';
    document.getElementById('save-button').style.display = 'none';

    // show the table list container
    document.getElementById('table-list-container').style.display = 'block';
}

/* The functions below are called when buttons are pressed in index.html */

function save()
{
    const packet = {};
    packet['tableName'] = document.getElementById('table-name');
    packet['pathToCSV'] = document.getElementById('path-to-csv');

    storage.set('packet'['tableName'], packet, function () {});

    showTableList();
}

function choose()
{
    const filePath = dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory'],
        filters: [{name: 'CSV', extensions: ['csv']}]
    });

    document.getElementById('path-to-csv').value = filePath;
}

// when the document loads, add event listeners to buttons
document.addEventListener("DOMContentLoaded", function ()
{
    document.getElementById('save-button').addEventListener('click', save);
    document.getElementById('choose-button').addEventListener('click', choose);

});