const tableList = require('./table-list');
const tableEditor = require('./table-editor');


// adds the table list to index.html
function addTableList()
{
    // import table-list.html
    const tableListImport = document.querySelector('link[id="table-list"]').import;

    // get the table list container div from the table list import
    const tableListContainer = tableListImport.getElementById('table-list-container');

    // add the table list container to the page content of index.html
    document.getElementsByClassName('page-content')[0].appendChild(tableListContainer.cloneNode(true));
}


// adds the table editor to index.html
function addTableEditor()
{
    // import table-list.html
    const tableListImport = document.querySelector('link[id="table-editor"]').import;

    // get the table list container div from the table list import
    const tableListContainer = tableListImport.getElementById('table-editor-container').cloneNode(true);

    // do not display the table editor upon import
    tableListContainer.style.display = 'none';

    // add the table list container to the page content of index.html
    document.getElementsByClassName('page-content')[0].appendChild(tableListContainer);
}

// when the document loads
document.addEventListener("DOMContentLoaded", function ()
{
    // load in external html docs
    addTableList();
    addTableEditor();

    // load the tables that the user has in storage
    tableList.loadTables(tableEditor.load);

    // add event listener to the add button
    document.getElementById('add-button').addEventListener('click', function ()
    {
        tableList.display(false);
        tableEditor.display(true);
        tableEditor.clear();
    });

    // add event listener to the save button
    document.getElementById('save-button').addEventListener('click', function ()
    {
        tableEditor.save();
        tableEditor.display(false);
        tableList.display(true);
        tableList.refreshTables();
    });

    // add event listener to the choose button
    document.getElementById('choose-button').addEventListener('click', tableEditor.choose);
});