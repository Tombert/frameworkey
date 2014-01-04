var routeList = require('../config/routeList');
var router = require('koa-router'); 
module.exports = function(app){
  app.use(router(app)); 
  for(var k in routeList){
    routeData = k.split(' '); 
    method = routeData[0].toLowerCase();
    route = routeData[1];
    app[method](route, routeList[k]); 
    
  }
}
