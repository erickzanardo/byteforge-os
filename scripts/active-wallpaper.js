const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const folder = `${ process.env.HOME }/wallpapers`;

const interv = parseInt(process.argv[2] || "10000");

let current = 0;
const alternateBg = (files) => {
  const fn = () => {
    cp.exec(`feh --bg-scale ${path.join(folder, files[current])}`);
    current++;
    if (current == files.length) current = 0;
  }
  fn();
  return fn;
}

try {
  fs.statSync(folder);
  const files = fs.readdirSync(folder).sort(() => (Math.random() * 5) > 2.5 ? 1 : -1);
  setInterval(alternateBg(files), interv);
} catch(e) {
  // Folder does not exists, nothing to do =)
}
