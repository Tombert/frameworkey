var rules = require('../config/policies'); 



var customPolicies = {}; 


require("fs").readdirSync("./policies").forEach(function(file) {
  if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    
    customPolicies[name] = require("../policies/" + file);
  }
});



module.exports = function (cont, action, scope, callback){
  var yil = require('yil');  
  var isAllowed = true; 

  //Right now, it's true until proven false.  


  policies = rules[cont][action]
  for(var i = 0; i< policies.length; i+=1){
//console.log(customPolicies[policies[i]])
    var test = customPolicies[policies[i]](scope); 

    //Standard trick to stack permissions in a loop by first comparing to something that's true. 
    isAllowed = isAllowed && test; 
    callback(null, isAllowed); 
  }
}
