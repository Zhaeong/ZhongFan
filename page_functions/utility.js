var fs = require('fs');
const path = require('path');


module.exports = {
  getJavascriptFile: function (filename, callback) 
  {
    var fullPath = __basedir + "/frontend/js" + filename;
  	if (fs.existsSync(fullPath)) 
    { 
      var fileContents = fs.readFileSync(fullPath, "utf8");   
      callback(fileContents);
    }
    else
    {
      callback("File not Found");
    }


  }
  
};