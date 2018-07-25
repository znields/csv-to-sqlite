const tl = require('./table-list');
const te = require('./table-editor');

const tableList = new tl.TableList();
const tableEditor = new te.TableEditor();

// adds listeners to the table list
function addTableListListeners()
{
    window.setTimeout( () =>
    {
        // retrieves the table list body
        const tableRows = document.getElementsByClassName('table-list--row');

        for (let i = 0; i < tableRows.length; i++)
        {
            tableRows[i].addEventListener('click', () =>
            {
                // loads the table editor
                tableEditor.load(tableRows[i].id);

                // displays the table editor
                tableList.display(false);
                tableEditor.display(true);
            });
        }
    }, 300);
}

document.addEventListener("DOMContentLoaded", () =>
{
    tableList.load();

    document.getElementById('add-button').addEventListener('click', () =>
    {
        tableEditor.add('table-' + tableList.rows.length);

        tableList.display(false);
        tableEditor.display(true);
    });

    // document.getElementById('export-button').addEventListener('click', () =>
    // {
    //
    // });
    //
    document.getElementById('save-button').addEventListener('click', () =>
    {
        tableEditor.save();
        tableEditor.clear();

        tableList.clear();
        tableList.load();

        tableList.display(true);
        tableEditor.display(false);

        addTableListListeners();
    });
    //
    document.getElementById('choose-button').addEventListener('click', () =>
    {
        tableEditor.choose();
    });

    addTableListListeners();
});