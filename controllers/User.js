module.exports = {
  find: function *(next){
    console.log('Enter Find Function');
    console.log(this.params.id);
    yield next; 
  },
  test: function *(next){
    console.log('enter test function');
    yield next; 
  }
}
