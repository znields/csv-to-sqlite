// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//

function convert() {

    const { spawn } = require('child_process');
    const ls = spawn('python', ['python/import_db.py', document.getElementById('file_location').value]);

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

}

function chooseFile() {
    
    const {dialog} = require('electron').remote;
    document.getElementById('file_location').value = dialog.showOpenDialog({properties: ['openFile', ],
        filters: [
            {name: 'Comma-separated values', extensions: ['csv']},
        ]
    });
    
}




