var routeList = require('../config/routeList');
var router = require('koa-router'); 
var controllers = {}
require("fs").readdirSync("./controllers").forEach(function(file) {
  if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    controllers[name] = require("../controllers/" + file);
  }
});
module.exports = function(app){
  app.use(router(app)); 
  for(var k in routeList){
    var routeData = k.split(' '); 
    var method = routeData[0].toLowerCase();
    var route = routeData[1];
    var actionData = routeList[k].split('.'); 
    var cont = actionData[0]; 
    var action = actionData[1]; 
    
    app[method](route,controllers[cont][action]); 
    
  }
}
