var CHARGER_CMD = "acpi -V | grep \"Adapter 0:\" | cut -c 12-";
var PERCENTAGE_CMD = "acpi -V | grep -m 1 \"Battery 0:\" | sed -r \"s/.*, ([0-9]?[0-9][0-9])%.*/\\1/\"";

var CHARGING_ICON = "\uf1bc"
var BATTERY_ICON = "\uf0cd"

var cp = require("child_process");

var exec = (cmd) => cp.execSync(cmd).toString().replace("\n", "");

var isCharging = () => exec(CHARGER_CMD) == "on-line";
var percentage = () => exec(PERCENTAGE_CMD);

module.exports = (update) => {
  var updateBattery = () => {
    update("battery", [
      isCharging() ? CHARGING_ICON : BATTERY_ICON,
      percentage() + "%"
    ].join(" "));
    setTimeout(updateBattery, 120000);
  };

  updateBattery();
};
