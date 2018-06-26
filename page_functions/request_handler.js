var db = require(__basedir + '/db_functions/db_main.js');

module.exports = {
  handleClientRequest: function (requestName, paramObj, callback) 
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
	    case "/getLunchInfoRequest":
	        
	        db.getLunchInfo(paramObj.lunchID ,function(result)
	        {	        	
	        	callback(result);
	        })

	        break;

	    case "/submitLunchInfoRequest":

	    	db.updateLunchInfo(paramObj.lunchID, paramObj.lunchName, paramObj.lunchDesc, paramObj.lunchDate, paramObj.lunchRating ,function(result)
	        {	        	
	        	callback(result);
	        })

	    	break;
	    default:
	        callback("Couldn't find the request handler")
	} 


  }  
};