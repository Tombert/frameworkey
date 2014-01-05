var co = require('co');
var render = require('co-render');

module.exports = {
  home: function *(next){
    console.log('Landing.home');
    this.body = yield this.render('index',{app_name: "Frameworkey"});
    yield next;
  }
}