const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const Store = require('./store.js');
const path = require('path')
const url = require('url')
const fs = require('fs');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
const store = new Store({
  // We'll call our data file 'accounts'
  configName: 'accounts',
  defaults: {
    accounts: { test: false, }
  }
});
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})
 //mainWindow.openDevTools();
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './app/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
const {Menu} = require('electron')

const template = [
  {
    label: 'KYCWallet',
    submenu: [
      {label: 'New Account',accelerator: 'CmdOrCtrl+N',
		  click (item, focusedWindow) {
          store.set('test', { test: true });
          console.log(JSON.stringify(fs.readFileSync(store.path)))
          console.log(store.get('test'))
        }},
      {role: 'close'}
    ]
  },
    {
    label: 'Network',
    submenu: [
      {label: 'Ropstein',accelerator: 'CmdOrCtrl+R',
		  click (item, focusedWindow) {
        }},
      {label: 'Main Net',accelerator: 'CmdOrCtrl+M',
		  click (item, focusedWindow) {
        }},
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload',accelerator: 'CmdOrCtrl+R',
		  click (item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload()
        }},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {role: 'minimize'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'On Github',accelerator:'CmdOrCtrl+G',
        click () { require('electron').shell.openExternal('https://github.com/jpbeaudet/KYCWallet') }
      },
      {
        label: 'Help',accelerator:'CmdOrCtrl+H',
        click () { require('electron').shell.openExternal('https://github.com/jpbeaudet/KYCWallet#README.md') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })

  // Edit menu
  template[1].submenu.push(
    {type: 'separator'},
    {
      label: 'Speech',
      submenu: [
        {role: 'startspeaking'},
        {role: 'stopspeaking'}
      ]
    }
  )

  // Window menu
  template[3].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
