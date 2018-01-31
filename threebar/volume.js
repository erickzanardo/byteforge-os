var fs = require("fs");

var home = require("./../system/modules/homepath");
var path = require("path");

var FILE = path.join(home(), ".bfvolume");

module.exports = function(update) {
  var readFile = () => fs.readFile(FILE, (err, data) =>  update("volume", ["\uf028", data.toString()].join(" ").replace("\n", "")));

  fs.watch(FILE, readFile);
  readFile();
};
