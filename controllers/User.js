module.exports = {
  find: function *(next){
    console.log('Enter Find Function')
    console.log(this.params.id)
  }
}
