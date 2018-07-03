const storage = require('./storage');
const {dialog} = require('electron').remote;


function load(tableName)
{
    storage.storage.get(tableName, function (error, data)
    {
        if (error) throw error;

        document.getElementById('table-name').value = data['tableName'];
        document.getElementById('path-to-csv').value = data['pathToCSV'];
    });
}

function choose()
{
    // prompts the user to choose a CSV file
    const filePath = dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory'],
        filters: [{name: 'CSV', extensions: ['csv']}]
    });

    // retrieves the path-to-csv input
    const pathToCSV = document.getElementById('path-to-csv');

    // sets the value to the file path
    pathToCSV.value = filePath;

    // sets the input to have an is dirty style
    pathToCSV.parentNode.classList.add('is-dirty');
}

function save()
{
    const packet = {};
    packet['tableName'] = document.getElementById('table-name').value;
    packet['pathToCSV'] = document.getElementById('path-to-csv').value;

    storage.storage.set(packet['tableName'], packet, function () {});
}

// clears the table editor
function clear()
{
    // retrieves the inputs for the table editor
    const tableName = document.getElementById('table-name');
    const pathToCSV = document.getElementById('path-to-csv');

    // sets the value of the inputs to an empty string
    tableName.value = '';
    pathToCSV.value = '';

    // resets the hints for the inputs
    tableName.parentNode.classList.remove('is-dirty');
    pathToCSV.parentNode.classList.remove('is-dirty');
}

function display(on)
{
    document.getElementById('table-editor-container').style.display = on ? 'block' : 'none';
    document.getElementById('save-button').style.display = on ? 'block' : 'none';
}

module.exports = {
    choose: choose,
    save: save,
    load: load,
    display: display,
    clear: clear
};