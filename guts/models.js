var Sequelize = require('sequelize'); 
var sequelize = new Sequelize('database', 'username', 'password');

var models = {}
var db = {}
require("fs").readdirSync("./models").forEach(function(file) {
  if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    
    models[name] = require("../models/" + file);
  }
});
for(var k in models){
  var modelObject = {};
  for(var j in models[k]){
    modelObject[j] = Sequelize[models[k][j]]; 
  }
  db[k] = sequelize.define(k, modelObject); 
}

module.exports = db
