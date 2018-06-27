const os = require('os');
const storage = require('electron-json-storage');

storage.setDataPath(os.tmpdir());


function add() {

    document.getElementsByClassName('mdl-layout-title')[0].innerHTML = 'New Table';

    document.getElementById('table-container').style.display = 'block';
    document.getElementById('list-container').style.display = 'none';
}