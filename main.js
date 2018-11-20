var electron = require('electron');
require('./index');
const { app, BrowserWindow, ipcMain } = require('electron');

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('ready', () => {
	const win = new BrowserWindow({
        show: false
    });
});