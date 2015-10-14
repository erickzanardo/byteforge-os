module.exports = function(update) {
  var updateTime = () => {
    update("datetime", [
        "\uf016",
        new Date().toLocaleTimeString("pt-BR"),
        "\uf06c",
        new Date().toLocaleDateString("pt-BR")
    ].join(" "));
  }
  setTimeout(updateTime, 60000);
  updateTime();
};
