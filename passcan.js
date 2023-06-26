var SerialPort = require("serialport");
var port = "COM7";
var message = "Hakuna Matata";

var serialPort = new SerialPort(port, {
  baudRate: 9600
});

Serial.on('pas', function (err) {
    if (err.toString()) {
       Keypad = err.toString()
       win.webContents.send("Keypad", Keypad)
      const Array = Keypad.split(":")
      process.stdout.write(Keypad)
     // console.log("test");
      // document.getElementById("myText").innerHTML = err.toString();
    }
  })