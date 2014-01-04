var koa = require('koa');
var app = koa();
var render = require('koa-render'); 
var router = require('./guts/router');
var models = require('./guts/models');
var views = require('./guts/views'); 
//var views = require('./views/'); 

router(app); 

// app.use(views('./views', {
//   map: {
//     html: 'underscore'
//   },
//   locals: {
//     title: 'with underscore'
//   },
//   cache: false
// }));

//view.add('layout', __dirname + '/views')

//koa.use(view());

app.listen(3000); 
