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
        this.tableData.columns = {};
        this.tableId = '';

        // constructs the node
        this.node_ = document.getElementById('table-editor-import')
            .import.getElementById('table-editor-container')
            .cloneNode(true);

        document.getElementById('page-content').appendChild(this.node_);

        // gets the table name and path inputs
        this.tableName_ = this.node_.querySelector('#table-name');
        this.tablePath_ = this.node_.querySelector('#table-path');

        // when a change occurs in the table name input, update table data
        this.tableName_.addEventListener('change', () => { this.tableData.name = this.tableName_.value; this.nameChange = true; } );
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
        // load the table data based on the id of the table
        storage.get(id, (error, data) =>
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

            // set the data table variable to the data loaded from storage
            this.tableData = data;
            this.tableId = id;
        });
    }


    add(id)
    {
        // sets the table id to the new table id
        this.tableId = id;

        // creates a new json object in storage for the new table
        storage.set(id, {name: '', path: '', columns: {}}, (error) => {});
    }

    // TODO: add ability to delete tables
    delete(id)
    {

    }


    save()
    {
        // sets the columns to empty before saving
        this.tableData.columns = {};

        // for each column add the column info to the column dictionary
        for (const i of this.rows)
        {
            this.tableData.columns[i.name] = i.type;
        }

        // set the storage
        storage.set(this.tableId, this.tableData, (error) => {
            return !error;
        });
    }


    choose()
    {
        // sets the value to the file path
        this.tablePath_.value = dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [{name: 'CSV', extensions: ['csv']}]
        })[0];

        // sets the input to have an is dirty style
        this.tablePath_.parentNode.classList.add('is-dirty');

        // updates the table data object with the selected CSV
        this.tableData.path = this.tablePath_.value;

        // clears rows if they exist
        this.rows.forEach( (row) => { row.clear(); });

        // reads the first line of the csv file at the path variable
        firstLine(this.tableData.path).then( (value) =>
        {
            // format the first line read from the csv file
            const columnNames = value.replace(/['"]+/g, '').split(',');

            for (const i of columnNames)
            {
                this.rows.push(new TableEditorRow(i, this.tableData.columns[i] ? this.tableData.columns[i] : 'blob'));
            }
        });
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