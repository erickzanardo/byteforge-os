module.exports = function(update) {
  var updateTime = () => {
    var d = new Date();
    update("datetime", [
        "\uf017",
        `${d.getHours().toString(2)}:${d.getMinutes().toString(2)}`,
        "\uf073",
        [
          d.getDate(),
          d.getMonth() + 1,
          d.getFullYear()
        ].join("/")
    ].join(" "));
    setTimeout(updateTime, 60000);
  }
  updateTime();
};
