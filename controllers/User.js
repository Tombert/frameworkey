var co = require('co');
var render = require('co-render');

module.exports = {
  find: function *(next){
    yield next; 
  },
  test: function *(next){
    this.body = yield this.render('blah', {name: 'koa'})
    yield next; 
  }
}
