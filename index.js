const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({ width: 1100, height: 800, show: false });

    win.loadURL('http://localhost:3000');

    win.once('ready-to-show', () => {
        win.show();
    });
}

app.on('ready', createWindow);
