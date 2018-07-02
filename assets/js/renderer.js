const os = require('os');
const storage = require('electron-json-storage');

storage.setDataPath(os.tmpdir() + "/com.isaiahnields.csv-to-sql");

// shows the list of tables that the user has imported
function importTableList()
{
    // import table-list.html
    const tableListImport = document.querySelector('link[id="table-list"]').import;

    // get the table list container div from the table list import
    const tableListContainer = tableListImport.getElementById('table-list-container');

// add the table list container to the page content of index.html
document.getElementsByClassName('page-content')[0].appendChild(tableListContainer.cloneNode(true));
}

// shows the editor for a specific table
function importTableEditor()
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

// when the document loads, show the list of tables
document.addEventListener("DOMContentLoaded", function () {
    importTableList();
    importTableEditor();
});