var Sequelize = require('sequelize'); 
var sequelize = new Sequelize('blah', 'root', '');

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
  for(var j in models[k].properties){
    modelObject[j] = Sequelize[models[k]['properties'][j].toUpperCase()]; 
  }
  db[k] = sequelize.define(k, modelObject); 
}

for(var k in models){
  for(var relation in models[k].associations){
    db[k][relation](db[models[k]['associations'][relation]]); 
  }
}

sequelize.sync().success(function(){
  console.log('Database Synchronized'); 
})
module.exports = db
