var routeList = require('../config/routes');
var router = require('koa-router'); 
var controllers = require('./controllers')
var views = require('./views'); 
var yil = require('yil');  
var formidable = require('formidable'); 
var policies = require('./policies'); 


var checkAuth = function(cont, action){
  return function *(next){
    var isAllowed = yield yil.callback(policies, cont, action, this); 
    if (isAllowed){
      yield next; 
    } else {
      this.body = {
	error: "Not Allowed"
      }
    }
  }
}

//Parse the params
var getParams = function*(next){
  var form = formidable.IncomingForm(); 
  var params = yield yil.callback({scope:form, func:form.parse}, this.req);
  params = params['0']; 
  for(var k in params){
    this.params[k] = params[k]; 
  }
  yield next; 
}
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
    functionsToCall.push(getParams)
    var actionList = routeList[k].split(' '); 
    for(var i=0; i<actionList.length; i+=1){
      var actionData = actionList[i].split('.');
      var cont = actionData[0]; 
      var action = actionData[1]; 
      var reCheckAuth = checkAuth(cont, action)
      functionsToCall.splice(1, 0, reCheckAuth); 
      functionsToCall.push(controllers[cont][action]); 
    }
    // var actionData = routeList[k].split('.'); 
    // var cont = actionData[0]; 
    // var action = actionData[1]; 
    

    app[method].apply(null, functionsToCall); 
    
  }
}
