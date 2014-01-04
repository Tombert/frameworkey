var controllers = {}
require("fs").readdirSync("./controllers").forEach(function(file) {
  if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    controllers[name] = require("../controllers/" + file);
  }
});


module.exports = controllers
