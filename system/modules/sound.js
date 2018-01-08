const homepath = require("./homepath");
const { exec } = require("node-exec-promise");

const lineValue = line => {
  let _line = line;
  let level = 0;

  while (_line[0] == "\t") {
    level++;
    _line = _line.replace(/\t/, "");
  }

  return { level, value: _line };
}

const parseListSinksOutput = output => {
  const lines = output.split("\n").map(lineValue);

  const sinks = {};
  let lastLevel = 0, currentValue;

  for (let i = 0; i < lines.length; i++) {
    const { level, value } = lines[i];

    if (level > lastLevel) {
      sinks[currentValue].push(value);
    } else {
      sinks[value] = [];
      currentLevel = level;
      currentValue = value;
    }
  }

  return sinks;
}

const sinks = () => exec("pactl list sinks").then(parseListSinksOutput);

module.exports = {
  sinks
}
