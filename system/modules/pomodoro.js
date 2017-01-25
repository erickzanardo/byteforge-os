const alarm = require("./alarm");
const fs = require("fs");
const homepath = require("./homepath");

const fileName = () => homepath() + "/.pomodoro"
const registerPomodoro = type => fs.writeFile(fileName(), type);
const unregisterPomodoro = () => registerPomodoro("Off");

const pomodoroAction = (type, seconds, message) => {
  registerPomodoro(type, seconds, message);
  alarm(seconds, message, unregisterPomodoro);
}

module.exports = {
  start: () => pomodoroAction("Pomodoro", 1500, "25 minutes pomodoro done"),
  smallBreak: () => pomodoroAction("Small break", 300, "5 minutes break done"),
  longBreak: () => pomodoroAction("Long break", 600, "10 minutes break done"),
}
