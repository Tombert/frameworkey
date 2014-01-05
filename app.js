var koa = require('koa');
var app = koa();
var logger = require('koa-logger');
var render = require('koa-render'); 
var serve = require('koa-static');
var session = require('koa-session');
var router = require('./guts/router');
var models = require('./guts/models');
var views = require('./guts/views'); 


app.use(logger());
app.keys = ['TODO move to a config file'];
app.use(session());
app.use(serve(__dirname + '/public'));

router(app); 


var port = 3000
app.listen(port);
console.log ("Server started listening on port " + port); 
