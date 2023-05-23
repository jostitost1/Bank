




















// boilerplate code for electron..
const {
    app,
    BrowserWindow,
    ipcMain
} = require("electron");
const path = require("path");  
let win;
let Keypad;

/**
 * make the electron window, and make preload.js accessible to the js
 * running inside it (this will allow you to communicate with main.js
 * from the frontend).
 */
async function createWindow() {

    // Create the browser window.
    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false,
            preload: path.join(__dirname, "./preload.js") // path to your preload.js file
        }
    });

    // Load app
    win.loadFile(path.join(__dirname, "index.html"));
}
app.on("ready", createWindow);

// end boilerplate code... now on to your stuff

/** 
 * FUNCTION YOU WANT ACCESS TO ON THE FRONTEND
 */
ipcMain.handle('Keypad', async (event, arg) => {
  return new Promise(function(resolve, reject) {
  
      
    if (true) {
        resolve(Keypad);
    } else {
        reject("this didn't work!");
    }
  });  
})











const { SerialPort } = require('serialport')

// Create a port
const Serial = new SerialPort({
  path: 'com7',
  baudRate: 9600,
})


Serial.on('data', function (err) {
  if (err.toString()) {
     Keypad = err.toString()
     win.webContents.send("Keypad", Keypad)
    const Array = Keypad.split(":")
    process.stdout.write(Keypad)
   // console.log("test");
    
 

    // document.getElementById("myText").innerHTML = err.toString();
  }
})




