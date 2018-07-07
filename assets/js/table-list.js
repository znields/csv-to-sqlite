const storage = require('./storage');


class TableList
{

    constructor()
    {
        this.rows = [];

        // constructs a node with the table list html content
        this.node_ = document.getElementById('table-list-import').import
            .getElementById('table-list-container')
            .cloneNode(true);

        // adds the node to page content
        document.getElementById('page-content').appendChild(this.node_);
    }


    display(on)
    {
        // display this node if on
        this.node_.style.display = on ? 'block' : 'none';
    }


    load()
    {
        storage.getAll( (error, data) =>
        {
            for (const i in data)
            {
                this.rows.push(new TableListRow('table-' + this.rows.length , data[i].name, data[i].path));
            }

        });
    }


    clear()
    {
        // clear any tables if they exist
        this.rows.forEach((row) => { row.clear(); });
        this.rows = [];

    }

    export()
    {

    }
}

class TableListRow
{

    constructor(id, name, path)
    {
        this.id = id;
        this.name = name;
        this.path = path;

        // creates the current table HTML by importing the template content
        this.node_ = document.importNode(document
            .getElementById('table-list--row-import')
            .import.querySelector('template')
            .content.querySelector('tr'), true);

        // add an id to the node
        this.node_.id = this.id;

        // sets the inner text of the data entries to the values loaded from storage
        this.node_.querySelector('.table-list--row-name').innerText = this.name;
        this.node_.querySelector('.table-list--row-path').innerText = this.path;

        // appends the clone to the table list
        document.getElementById('table-list-body').appendChild(this.node_);
    }


    clear()
    {
        this.node_.remove();
    }
}

// exports the table list functions
module.exports = {
    TableList: TableList
};
