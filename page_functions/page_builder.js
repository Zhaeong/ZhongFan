var fs = require('fs');
const path = require('path');


module.exports = {
  generatePage: function (pageName, callback) 
  {
  	var htmlOut = "<!DOCTYPE html><html>";

  	var headerHTML = getHeadElement(pageName);
  	
    var topToolbarHTML = fs.readFileSync(__basedir + "/frontend/html/StaticItems/top_toolbar.html", "utf8");

    var bodyHTML = getBodyElement(pageName);

  	htmlOut += headerHTML;
    htmlOut += topToolbarHTML;
  	htmlOut += bodyHTML;

  	htmlOut += "</html>";

  	callback(htmlOut);

  }
};


function getHeadElement(pageName)
{
  var headerOutput = "<head>";
  headerOutput += fs.readFileSync(__basedir + "/frontend/html/commonHead.html", "utf8");

  var fullPath = __basedir + "/frontend/html/" + pageName + "_head.html";
  if (fs.existsSync(fullPath)) 
  {
    headerOutput += fs.readFileSync(fullPath, "utf8");
  }
  else
  {
    console.log("ERROR: File not found:" + fullPath)
  }

  headerOutput += "</head>";

  return headerOutput;
}


function getBodyElement(pageName)
{
  var bodyOutput = "<body>";
  var fullPath = __basedir + "/frontend/html/" + pageName + "_body.html";
  if (fs.existsSync(fullPath)) 
  {
    bodyOutput += fs.readFileSync(fullPath, "utf8");
  }
  else
  {
    console.log("ERROR: File not found:" + fullPath)
  }  

  bodyOutput += "</body>";
  return bodyOutput;
}



