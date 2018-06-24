var db = require(__basedir + '/db_functions/db_main.js');

module.exports = {
  handleClientRequest: function (requestName, callback) 
  {
    console.log("received request:" + requestName);

    switch(requestName) 
    {
	    case "/getLunchItemRequest":
	        db.getAllLunches(function(result)
	        {	        	
	        	callback(result);
	        })
	        break;
	    default:
	        callback("Couldn't find the request handler")
	} 


  }  
};