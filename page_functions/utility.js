var fs = require('fs');
const path = require('path');


module.exports = {
  getSourceFile: function (filename, callback) 
  {
    var fullPath = __basedir + filename;
  	if (fs.existsSync(fullPath)) 
    { 
      var fileContents = fs.readFileSync(fullPath, "utf8");   
      callback(fileContents);
    }
    else
    {
      callback("File not Found");
    }
  },

  getCSSFile: function (filename, callback)
  {
    var fullPath = __basedir + "/frontend/css" + filename;
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