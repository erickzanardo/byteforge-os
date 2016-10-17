const exec = require("child_process").exec;

const message = (level, summary, body) => {
  if (!summary) throw "At least a body is required";
  if (!body) body = summary;

  exec(`notify-send -u ${level} ${summary} ${body}`);
}

module.exports = {
  low: (summary, body) => message("low", summary, body),
  normal: (summary, body) => message("normal", summary, body),
  critical: (summary, body) => message("critical", summary, body)
}
