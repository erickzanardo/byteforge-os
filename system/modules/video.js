const { exec } = require("node-exec-promise");
const { contains, filter, prop, propEq } = require("ramda");
const fs = require("fs-extra");
const homepath = require("./homepath");
const { loadPreferences, setPreference } = require("./preference-storage")

const connectedDislays = () => displays().then(filter(propEq("connected", true), displays));

const PREFERENCE_KEY = "video";

const parseDisplayLine = line => {
  const lineSplit = line.split(" ");
  const [ display, connected, primary ] = lineSplit;

  const isConnected = connected == "connected";

  if (!isConnected) {
    return ({
      display,
      connected: isConnected,
    });
  }

  const mode = primary == "primary" ? lineSplit[3] : primary;

  const [resolutionLine, posX, posY] = mode.split("+");
  const [width, height] = resolutionLine.split("x");

  return ({
    display,
    connected: isConnected,
    pos: { x: parseInt(posX, 10), y: parseInt(posY, 10) },
    resolution: { width: parseInt(width, 10), height: parseInt(height, 10) },
    modes: [],
  });
}

const parseModeLine = line => {
  const [ _, width, height ] = line.match(/(\d+)x(\d+)/);
  return {
    width: parseInt(width, 10),
    height: parseInt(height, 10),
  };
}

const parseXrandrOutput = output => output.split("\n")
  .filter(line => line.match(/Screen/) == null)
  .filter(line => line !== "")
  .reduce((displays, line) => {
    if (line[0] == " ") {
      const display = displays[displays.length - 1]
      display.modes = display.modes.concat([ parseModeLine(line) ]);

      return displays;
    } else {
      return displays.concat([ parseDisplayLine(line) ]);
    }
  }, []);


const displays = () => exec("xrandr").then(parseXrandrOutput);

const checkResolution = (display, resolution) =>
  new Promise((resolve, reject) => {
    const matches = display.modes.filter(res => Math.abs(res.width - resolution.width) <= 10 && Math.abs(res.height - resolution.height) <= 10)

    resolve(matches[0])
  })

const addResolution = (display, { width, height }) =>
  exec(`cvt ${width} ${height}`)
    .then(output => output.split("\n"))
    .then(filter(line => line.indexOf("Modeline") == 0))
    .then(([line]) => line.replace("Modeline ", ""))
    .then(line => line.replace(/_[0-9][0-9]\.[0-9][0-9]/, ""))
    .then(modeline => {
      const modename = modeline.match(/"(.*)"/)[1]

      return exec(`xrandr --newmode ${modeline}`)
        .then(() => exec(`xrandr --addmode ${display.display} ${modename}`))
        .then(() => modename)
    })


const res = ({ width, height }) => `${width}x${height}`

const mirrorDisplays = (main, second) =>
  checkResolution(second, main.resolution)
    .then(resolution => {
      const mirror = newRes => exec(`xrandr --output ${second.display} --mode ${newRes} --same-as ${main.display}`)

      return resolution
        ? mirror(res(resolution))
        : addResolution(second, main.resolution).then(mirror)
    })

const configDisplay = (display, resolution, position) => {
  const resolutionOpt =
    resolution == resolution ?
      "auto" ?
        "--auto" :
        `--mode ${resolution.width}x${resolution.height}` :
      "";

  const positionOpt =
    position ?
      position.display ?
        `--${position.position} "${position.display}"` :
        `--pos ${position.x}x${position.y}` :
      "";

  return exec(`xrandr --output "${display}" ${resolutionOpt} ${positionOpt}`);
}

const persistCurrentConfig = () => setPreference(PREFERENCE_KEY, connectedDislays());

const initDisplays = () =>
  Promise.all([ connectedDislays(), loadPreferences().then(prop(PREFERENCE_KEY)) ])
    .then(([ currentDisplays, persistedDisplays ])  => {

      const currentDisplayNames = currentDisplays.map(prop("display"));

      return Promise.all(
        persistedDisplays
          .filter(({ display }) => contains(display, currentDisplayNames))
          .map(({ display, pos, resolution }) => configDisplay(display, resolution, pos))
      )
    });

module.exports = {
  mirrorDisplays,
  configDisplay,
  displays,
  initDisplays,
  persistCurrentConfig,
};
