const picoSpeaker = require("pico-speaker");
const script = require("./scripts/scripts");

const sky = {
  start: () => {
  },
  say: (text) => picoSpeaker.speak(text),
  scriptedPhrase: (key) => sky.say(script(key))
};

module.exports = sky;
