const os = require('os');
const storage = require('electron-json-storage');

storage.setDataPath(os.tmpdir());




