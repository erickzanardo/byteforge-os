const fs = require("fs-extra");
const homepath = require("./homepath");

const PREFERENCES_FILE = `${homepath()}/.bf_preferences`;

const loadPreferences = () =>
  fs.readJson(PREFERENCES_FILE)
    .catch(err => err.code == "ENOENT" ? Promise.resolve({}) : Promise.reject(err))

const setPreference = (key, value) =>
  loadPreferences()
    .then(preferences => Object.assign({}, preferences, { [key]: value }))
    .then(preferences => fs.writeJson(PREFERENCES_FILE, preferences))

module.exports = {
  loadPreferences,
  setPreference
}
