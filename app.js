var koa = require('koa');
var app = koa();
var router = require('./guts/router')

router(app); 


app.listen(3000); 
