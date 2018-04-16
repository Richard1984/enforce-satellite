const readline = require("readline");
const { XBee } = require("./deps/XBee");
const sensors = require("./Toggle")
const fs = require("fs")
const xbee = new XBee(process.env.SATSERIAL || "COM5", 115200);
/*{ sendData: function(data) { console.log(data) }, on: function(e, cb) { cb(e) } };*/

const l = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function theData() {
  let data = sensors.gps.GetData()
  fs.writeFileSync("./gps-data.js", data+",")
  return data
}

l.on("line", d => {
  xbee.sendData(d);
})

setTimeout(() => { setInterval(() => { xbee.sendData(theData()) }, 1000)}, 1000)

xbee.on("data", d => {
  console.log(d);
})