var fs = require('fs');
const path = require('path');


module.exports = {
  generateMainPage: function (callback) 
  {


  	var htmlOut = "<!DOCTYPE html><html>";

  	var headerHTML = fs.readFileSync(__basedir + "/frontend/html/main_head.html", "utf8");
  	
    var topToolbarHTML = fs.readFileSync(__basedir + "/frontend/html/StaticItems/top_toolbar.html", "utf8");

    var bodyHTML = fs.readFileSync(__basedir + "/frontend/html/main_body.html", "utf8");

  	htmlOut += headerHTML;

    htmlOut += topToolbarHTML;
  	htmlOut += bodyHTML;


  	htmlOut += "</html>"



  	callback(htmlOut);

  },
  generateAddLunchPage: function (callback) 
  {
    var htmlOut = "<!DOCTYPE html><html>";

    var headerHTML = fs.readFileSync(__basedir + "/frontend/html/main_head.html", "utf8");
    
    var topToolbarHTML = fs.readFileSync(__basedir + "/frontend/html/StaticItems/top_toolbar.html", "utf8");

    var bodyHTML = fs.readFileSync(__basedir + "/frontend/html/addLunch_body.html", "utf8");


    htmlOut += headerHTML;

    htmlOut += topToolbarHTML;
    htmlOut += bodyHTML;


    htmlOut += "</html>"



    callback(htmlOut);
  }
};