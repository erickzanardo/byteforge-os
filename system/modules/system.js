const { exec } = require("child_process");
const say = require("./say");

module.exports = {
  shutdown: () => {
    say("Shutting down, see you next time captain!");

    exec("dbus-send --system --print-reply --dest=\"org.freedesktop.ConsoleKit\" /org/freedesktop/ConsoleKit/Manager org.freedesktop.ConsoleKit.Manager.Stop")
  },
  reboot: () => {
    say("Rebooting all systems");

    exec("dbus-send --system --print-reply --dest=\"org.freedesktop.ConsoleKit\" /org/freedesktop/ConsoleKit/Manager org.freedesktop.ConsoleKit.Manager.Restart");
  },
  lock: () => {
    say("Locking access to this station!");

    exec("xrandr | grep \* | cut -c 4-12 | tail -1", (error, stdout, stderr) => 
      exec(`convert -resize ${stdout} ~/.bfos/images/lockscreenimage.png /tmp/locksreenimage.png`, () =>
        exec("i3lock -i /tmp/locksreenimage.png -c 000000"))
    );
  },
  logout: () => {
    say("Session destroy protocol initiated!");

    exec("i3-msg exit");
  }
}
