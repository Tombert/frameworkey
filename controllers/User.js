var co = require('co');
var render = require('co-render');

module.exports = {
  find: function *(next){
    console.log('Enter Find Function');
    console.log(this.params.id);
    yield next; 
  },
  test: function *(next){
    console.log('enter test function');
    this.body = yield this.render('blah', {name: 'koa'})
    // co(function *(){
    //   this.body = yield this.render('blah', {name: 'asdfasdf'})      
    // })

    yield next; 
  }
}
