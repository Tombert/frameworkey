var rules = require('../config/policies'); 



var customPolicies = {}; 


require("fs").readdirSync("./policies").forEach(function(file) {
  if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    
    customPolicies[name] = require("../policies/" + file);
  }
});



module.exports = function (cont, action, callback){

  var policyFuncs = []

  




  if ((typeof rules !== "undefined" && rules !== null ? (_ref = rules[cont]) != null ? _ref[action] : void 0 : void 0) != null) {
    var policies = rules[cont][action]    
  } else {
    var policies = rules[cont]['*']; 
  }
  
  for(var i=0; i<policies.length; i+=1){
    policyFuncs.push(customPolicies[policies[i]]); 
  }
  
  
  callback(null, policyFuncs); 
}
