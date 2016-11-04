const { exec } = require("child_process");
const sky = require("./sky/sky");

module.exports = {
  shutdown: () => {
    sky.scriptedPhrase("shutdown").then(() => {
      exec("dbus-send --system --print-reply --dest=\"org.freedesktop.ConsoleKit\" /org/freedesktop/ConsoleKit/Manager org.freedesktop.ConsoleKit.Manager.Stop")
    });
  },
  reboot: () => {
    sky.scriptedPhrase("reboot").then(() => {
      exec("dbus-send --system --print-reply --dest=\"org.freedesktop.ConsoleKit\" /org/freedesktop/ConsoleKit/Manager org.freedesktop.ConsoleKit.Manager.Restart");
    });
  },
  lock: () => {
    sky.scriptedPhrase("lock").then(() => {
      exec("xrandr | grep \* | cut -c 4-12 | tail -1", (error, stdout, stderr) => 
        exec(`convert -resize ${stdout} ~/.bfos/images/lockscreenimage.png /tmp/locksreenimage.png`, () =>
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
