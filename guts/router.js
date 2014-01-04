var routeList = require('../config/routeList');
var router = require('koa-router'); 
var controllers = require('./controllers')
var views = require('./views'); 

module.exports = function(app){
  app.use(views('./views', {
    map: {
      html: 'ejs', 
      ejs: 'ejs'
    },
    locals: {
      title: 'with underscore'
    },
    cache: false
  }));
  app.use(router(app)); 
  for(var k in routeList){
    var functionsToCall = []
    var routeData = k.split(' '); 
    var method = routeData[0].toLowerCase();
    var route = routeData[1];
    functionsToCall.push(route); 
    var actionList = routeList[k].split(' '); 
    for(var i=0; i<actionList.length; i+=1){
      var actionData = actionList[i].split('.');
      var cont = actionData[0]; 
      var action = actionData[1]; 
      functionsToCall.push(controllers[cont][action]); 
    }
    // var actionData = routeList[k].split('.'); 
    // var cont = actionData[0]; 
    // var action = actionData[1]; 
    

    app[method].apply(null, functionsToCall); 
    
  }
}
