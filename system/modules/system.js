const { exec } = require("child_process");
const sky = require("./sky/sky");

module.exports = {
  shutdown: () => {
    sky.scriptedPhrase("shutdown").then(() => {
      exec("shutdown -P 0")
    });
  },
  reboot: () => {
    sky.scriptedPhrase("reboot").then(() => {
      exec("reboot");
    });
  },
  lock: () => {
    sky.scriptedPhrase("lock").then(() => {
      exec("xrandr | grep \\* | cut -c 4-12 | head -n 1", (error, stdout, stderr) =>
        exec(`convert -resize ${stdout.replace("\n", "")} ~/.bfos/images/lockscreenimage.png /tmp/locksreenimage.png`, () =>
          exec("i3lock -i /tmp/locksreenimage.png -c 000000"))
      );
    });
  },
  logout: () => {
    sky.scriptedPhrase("logout").then(() => {
      exec("i3-msg exit");
    });
  }
}
