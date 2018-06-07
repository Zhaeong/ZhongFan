var fs = require('fs');
const path = require('path');


module.exports = {
  generateMainPage: function (callback) 
  {
  	headFile = __basedir + "/frontend/html/main_head.html";
  	bodyFile = __basedir + "/frontend/html/main_body.html";

  	var htmlOut = "<!DOCTYPE html><html>";

  	var headerHTML = fs.readFileSync(headFile, "utf8");
  	var bodyHTML = fs.readFileSync(bodyFile, "utf8");


  	htmlOut += headerHTML;
  	htmlOut += bodyHTML;


  	htmlOut += "</html>"



  	callback(htmlOut);
 //  	fs.readFile(filename, function(err, data) 
	//   	{
	// 		if (err) 
	//  		{
	//       		callback("404 Not Found");
	//     	} 
	// 	    callback(data);
	//     }
	// );
    // whatever
  },
  bar: function () {
    // whatever
  }
};