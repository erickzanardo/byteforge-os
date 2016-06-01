module.exports = function(update) {
  var updateTime = () => {
    var d = new Date();
    update("datetime", [
        "\uf073",
        d.toLocaleTimeString("pt-BR"),
        "\uf017",
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
