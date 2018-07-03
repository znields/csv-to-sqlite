const os = require('os');
const storage = require('electron-json-storage');

// sets the path of storage to a temporary directory
storage.setDataPath(os.tmpdir() + "/com.isaiahnields.csv-to-sql");

module.exports.storage = storage;