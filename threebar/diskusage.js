var DISK_USAGE_CMD = "df -hPl / | awk 'NR==2{print $4}'",
    DISK_ICON = "\uf1c0",
    cp = require("child_process"),
    exec = (cmd) => cp.execSync(cmd).toString().replace("\n", ""),
    diskUsage = () => exec(DISK_USAGE_CMD);

module.exports = function(update) {
  var updateDiskUsage = () => {
    update("diskusage", [
      DISK_ICON,
      diskUsage() + "B"
    ].join(" "));
    setTimeout(updateDiskUsage, 50000);
  };

  updateDiskUsage();
};
