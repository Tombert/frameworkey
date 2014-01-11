module.exports = {
  properties:{
    'username':'STRING'
  }, 
  instance: {
    test: function(){
      console.log('Test'); 
    }
  }, 
  associations: {
    'hasMany': 'Menu'
  }
}
