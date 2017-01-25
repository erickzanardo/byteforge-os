const fs = require("fs");

const RUNNING_ICON = "\ue001";
const OFF_ICON = "\ue002";
const SMALL_BREAK_ICON = "\ue003";
const LONG_BREAK_ICON = "\ue006";

const home = require("./../system/modules/homepath");
const path = require("path");

const FILE = path.join(home(), ".pomodoro");

const readFile = callback => { 
  fs.readFile(FILE, (err, data) => {
    callback(err, data ? data.toString() : null);
  });
};

module.exports = update => {
  const updatePomodoro = () => {
    readFile((err, type) => 
      update("pomodoro", 
        type == "Pomodoro" ? RUNNING_ICON :
        type == "Small break" ? SMALL_BREAK_ICON :
        type == "Long break" ? LONG_BREAK_ICON : OFF_ICON
      )
    )
  }

  updatePomodoro();
  fs.watchFile(FILE, updatePomodoro);
}
