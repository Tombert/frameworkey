var koa = require('koa');
var app = koa();
var router = require('./guts/router');
var models = require('./guts/models'); 

router(app); 


app.listen(3000); 
