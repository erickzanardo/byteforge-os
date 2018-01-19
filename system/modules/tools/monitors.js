#!/usr/bin/env node

const { exec } = require("node-exec-promise");

const { forEach, map, filter, propEq } = require("ramda")
const { displays, mirrorDisplays } = require("../video")

const [_, bin, task, ...params] = process.argv

const printDisplay = display => {
  console.log(`Display: ${display.display} (${ display.connected ? "ON" : "OFF" })`)
  if (display.connected) {
    console.log(`Position: ${display.pos.x}x${display.pos.y}`)
    console.log(`Current resolution: ${display.resolution.width}x${display.resolution.height}`)
    console.log("Available resolutions")

    display.modes.forEach(mode => console.log(` - ${mode.width}x${mode.height}`))
  }

  console.log("")
}

const mirror = () => {
  displays()
    .then(filter(propEq("connected", true)))
    .then(([main, second]) => mirrorDisplays(main, second))
}

switch(task) {
  case "list": {
    console.log("List of displays:")
    console.log("")

    displays()
      .then(forEach(printDisplay))
      .catch(console.error)
  }
  case "mirror": {
    mirror()
  }
}
