const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: false,
            preload: path.join(__dirname, '/preload.js')
        }
    });

    win.loadFile('index.html');
    win.loadFile('../scripts/main.js');
};

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit();
});