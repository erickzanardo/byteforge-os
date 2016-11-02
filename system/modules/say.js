const { exec } = require("child_process");

module.exports = (text) => 
  exec(`espeak "${text}" -v female1`)
