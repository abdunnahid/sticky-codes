import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow = null;
const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  const appWidth = serve ? screenSize.width - 200 : 400;
  const appHeight = serve ? screenSize.height - 200 : 600;

  // Create the browser window.
  win = new BrowserWindow({
    x: (screenSize.width / 2) - (appWidth / 2),
    y: (screenSize.height / 2) - (appHeight / 2),
    width: serve ? screenSize.width - 200 : appWidth,
    height: serve ? screenSize.height - 200 : appHeight,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
    },
    icon: path.join(__dirname, 'src/favicon.png'),
    frame: false
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools();
    win.setAlwaysOnTop(false);
    win.setMenuBarVisibility(true);
  }
  else {
    win.setAlwaysOnTop(true, 'screen-saver');
    win.setMenuBarVisibility(false);
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
  return win;
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} 
catch (e) {
  // Catch Error
  // throw e;
}
