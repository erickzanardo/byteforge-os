const library = {};

const dice = (opts) =>
  () => opts[Math.floor(Math.random() * opts.length)];

library["shutdown"] = dice(require("./system/shutdown"));
library["reboot"] = dice(require("./system/reboot"));
library["lock"] = dice(require("./system/lock"));
library["logout"] = dice(require("./system/logout"));

library["welcome"] = dice(require("./welcome"));

module.exports = (key) => library[key] ? library[key]() : "I don't know how to say that.";
