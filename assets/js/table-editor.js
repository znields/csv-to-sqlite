const storage = require('./storage');
const {dialog} = require('electron').remote;
const fs = require('fs');
const firstLine = require('firstline');


class TableEditor
{

    constructor()
    {
        // initialize table editor variables
        this.rows = [];
        this.tableData = {};

        // constructs the node
        this.node_ = document.getElementById('table-editor-import')
            .import.getElementById('table-editor-container')
            .cloneNode(true);

        document.getElementById('page-content').appendChild(this.node_);

        // gets the table name and path inputs
        this.tableName_ = this.node_.querySelector('#table-name');
        this.tablePath_ = this.node_.querySelector('#table-path');

        // when a change occurs in the inputs, update table data
        this.tableName_.addEventListener('change', () => this.tableData.name = this.tableName_.value);
        this.tablePath_.addEventListener('change', () => this.tableData.path = this.tablePath_.value);
    }


    display(on)
    {
        // display this node node if on
        this.node_.style.display = on ? 'block' : 'none';

        // show the save button if on is true
        document.getElementById('save-button').style.display = on ? 'block' : 'none';
    }


    load(id)
    {
        const name = id.substring(17);

        // load the table data based on the id of the table
        if (name) storage.get(name, (error, data) =>
        {
            // set the input values to the table values
            this.tableName_.value = data.name;
            this.tablePath_.value = data.path;
            data.columns = data.columns ? data.columns : {};

            // remove the hints from inputs
            this.tableName_.parentNode.classList.add('is-dirty');
            this.tablePath_.parentNode.classList.add('is-dirty');

            // reads the first line of the csv file at the path variable
            firstLine(data.path).then( (value) =>
            {
                // format the first line read from the csv file
                const columnNames = value.replace(/['"]+/g, '').split(',');

                for (const i of columnNames)
                {
                    this.rows.push(new TableEditorRow(i, data.columns[i] ? data.columns[i] : 'blob'));
                }
            });

            this.tableData = data;

        });
    }


    save()
    {
        for (const i of this.rows)
        {
            this.tableData.columns[i.name] = i.type;
        }
        storage.set(this.tableData.name, this.tableData, (error) => { if (error) throw error; });
    }


    choose()
    {
        // sets the value to the file path
        this.tablePath_.value = dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory'],
            filters: [{name: 'CSV', extensions: ['csv']}]
        })[0];

        // sets the input to have an is dirty style
        this.tablePath_.parentNode.classList.add('is-dirty');

        // updates the table data object with the selected CSV
        this.tableData.path = this.tablePath_.value;
    }


    clear()
    {

        // clears rows if they exist
        this.rows.forEach( (row) => { row.clear(); });

        // resets all variables
        this.tableName_.value = '';
        this.tablePath_.value = '';

        this.tableName_.parentNode.classList.remove('is-dirty');
        this.tablePath_.parentNode.classList.remove('is-dirty');

        this.rows = [];
        this.tableData = {};

        // clears the
        this.tableData = {};
    }

}

class TableEditorRow
{

    constructor(name, type)
    {
        this.name = name;
        this.type = type;

        // constructs the node based on the table editor row template
        this.node_ = document.importNode(document
            .getElementById('table-editor--row-import')
            .import.querySelector('template')
            .content.querySelector('tr'), true);

        // sets up the node with the input values
        this.node_.id = 'table-editor--row--' + this.name;
        this.node_.querySelector('.table-editor--row-name').innerText = this.name;
        this.node_.querySelector('.table-editor--row-type').value = this.type;

        // adds an event listener to update the rows if a type is changed
        this.node_.querySelector('.table-editor--row-type').addEventListener('change', () =>
        {
            this.type = this.node_.querySelector('.table-editor--row-type').value;
        });

        // loads the node into the page
        document.getElementById('table-editor-body').appendChild(this.node_);
    }

    // removes the node from the page
    clear()
    {
        this.node_.remove();
    }
}



// exports the table editor functions
module.exports = {
    TableEditor: TableEditor
};