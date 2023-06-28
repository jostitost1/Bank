const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const https = require('http');


// boilerplate code for electron..
const {
    app,
    BrowserWindow,
    ipcMain,
    ipcRenderer
} = require("electron");
const path = require("path");  
let win;
let Keypad;
let passid;
let bedrag;
let x = null;

/**
 * make the electron window, and make preload.js accessible to the js
 * running inside it (this will allow you to communicate with main.js
 * from the frontend).
 */
async function createWindow() {

    // Create the browser window.
    win = new BrowserWindow({
        width: 1920,
        height: 1000,
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
        resolve(Keypad)
        console.log(Keypad);
    } else {
        reject("this didn't work!");
    }
  });  
})

function sendDataToArduino(data) {
  Serial.write(data.toString() + '\n', function (err) {
    if (err) {
      return console.log('Error writing to port: ', err.message);
    }
   
    console.log('Data sent:', data);
  });
}


const pasArary = []
ipcMain.on('set-title', (event, arg) => {
  console.log(arg);
  x = arg
  setTimeout(()=> sendDataToArduino(x), 3000); // Example input data
})

let keypadBuffer = [];
ipcMain.on('passid', (event, arg) => {

  let key = Keypad.split(":");
  if(key[0] == "key"){
    console.log(arg.split(":")[1])
    keypadBuffer.push(arg.split(":")[1].charAt(0)); 

  }else passid = arg.split(":")[1].trim()
  if (keypadBuffer.length === 6 ) { 
    console.log(passid)
    console.log()
    // keypadBuffer.slice(4)
    // console
    
    const data = JSON.stringify({
      pasid: passid, 
      pincode: keypadBuffer.toString().replaceAll(',',''),
      
        bedrag:x

      
      
    });
    console.log(x)
    const options = {
      hostname: '145.24.222.146',
      port: '8239',
      path: '/api/post/klant',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const option = {
      hostname: '145.24.222.146',
      port: '8239',
      path: '/api/post/saldo',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const request = https.request(options, (response) => {
      let responseData = '';
      let passid = '';
    
      response.on('data', (chunk) => {
        responseData += chunk;
        passid += passid
      });
    
      response.on('end', () => {
       const saldo = JSON.parse(responseData);
       console.log(saldo);
       setInterval(() => {
        const data = saldo // haal de gegevens op vanuit de backend
        win.send('DataUpdate', data);
      }, 1000); // verzend gegevens elke 1 seconde
      
      });

    });

    const req = https.request(option, (res) => {
      let resData = '';
      let passid = '';
      
      res.on('data', (chunk) => {
       resData += chunk;
       passid += passid;

    });



      res.on('end', () => {
        
        const saldo = JSON.parse(resData);
        console.log(saldo);
      })


    });
    

    keypadBuffer = [];
  
    
    // request.on('error', (error) => {
    //   console.error('Fout bij het maken van het HTTP-verzoek:', error);
    // });

    req.on('error', (error) => {
      console.error('Fout bij het maken van het HTTP-verzoek:', error);
    });
    
    req.write(data);
    request.write(data);
    request.end();
    req.end();
   


}

});




const { SerialPort } = require('serialport')

// Create a port
const Serial = new SerialPort({
  path: '/dev/cu.usbserial-110',
  baudRate: 9600,
})


Serial.on('data', function (err) {
  if (err.toString()) {
    Keypad = err.toString()
    win.webContents.send("Keypad", Keypad)
    
    const Array = Keypad.split(":")
   
 console.log(Array[0])
   //console.log(Array)
   // console.log(JSON.stringify(Keypad))
   
  }})


// function sendDataToArduino(data) {
//   Serial.write(data.toString() + '\n', function (err) {
//     if (err) {
//       return console.log('Error writing to port: ', err.message);
//     }
   
//     console.log('Data sent:', data);
//   });
// }