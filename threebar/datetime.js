module.exports = function(update) {
  var updateTime = () => {
    var d = new Date();
    update("datetime", [
        "\uf016",
        d.toLocaleTimeString("pt-BR"),
        "\uf06c",
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
