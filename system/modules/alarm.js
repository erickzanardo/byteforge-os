const player = require("play-sound")(opts = {});
const homepath = require("./homepath");
const toast = require("./toast");

module.exports = (seconds, message) => {
  if (!seconds) return console.error("No parameter was specified.");
	
  seconds = parseInt(seconds, 10);
  if (isNaN(seconds)) return console.error("The seconds paramenter must be a valid integer number.");

  seconds = seconds * 1000;

  setTimeout(() => {
    toast.normal("Alarm", message);
    player.play(homepath() + "/.bfos/resources/sfx/alarm.wav", () => console.log("alarm execution successful"));
  }, seconds);
}
