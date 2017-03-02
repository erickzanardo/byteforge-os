const picoSpeaker = require("pico-speaker");
const script = require("./scripts/scripts");
const homepath = require("../homepath");
const toast = require("../toast");

const fs = require("fs");

const isSilentMode = fs.existsSync(`${homepath()}/.sky-silent-mode`);

const sky = {
  start: () => {
    sky.scriptedPhrase("welcome");
  },
  say: (text) => isSilentMode ? Promise.resolve(toast.normal("Sky", text)) : picoSpeaker.speak(text),
  scriptedPhrase: (key) => sky.say(script(key))
};

module.exports = sky;
