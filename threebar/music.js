const cp = require("child_process");

const NOW_PLAYING_CMD = "cmus-remote --query | grep \"tag title\" | cut -b 11-";
const STATUS_CMD = "cmus-remote --query | grep \"status\" | cut -b 8-";

const PLAYING_ICON = "\uf04b";
const STOPPED_ICON = "\uf04d";

const exec = cmd => cp.execSync(cmd).toString().replace("\n", "");

const isPlaying = () => exec(STATUS_CMD) === "playing";
const currentPlay = () => exec(NOW_PLAYING_CMD);

console.log(currentPlay());

module.exports = update => {
  const updateMusic = () => {
    update("music", [
        isPlaying() ? PLAYING_ICON : STOPPED_ICON,
        currentPlay()
    ].join(" "));
    setTimeout(updateMusic, 60000);
  };

  updateMusic();
}
