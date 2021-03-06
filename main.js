var http = require('http');
var url = require('url');
var fs = require('fs');

var qs = require('querystring');

global.__basedir = __dirname;

var pb = require('./page_functions/page_builder.js');
var db = require('./db_functions/db_main.js');
var util = require('./page_functions/utility.js');
var rh = require('./page_functions/request_handler.js');

var port = process.env.PORT || 8080;

http.createServer(function (req, res) {

	var q = url.parse(req.url, true);

  var pathname = q.pathname;

  //Returns a key value object containing the parameters
  var paramObj = q.query;
	console.log("The path is:" + pathname);
  console.log("The params is:");
  console.log(paramObj);  

  var numParams = Object.keys(paramObj).length;

  console.log("the number of params is:" + numParams);

  console.log("The method is:" + req.method);

  if(req.method == "GET")
  {
    console.log("===============================");
    console.log("concat is: " + pathname.slice(-3));


    //handles file requests of type javascript
    if(pathname.slice(-3) == ".js")
    {
      util.getSourceFile(pathname, function(result)
      {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(result);
        res.end();
      });     
    }
    else if(pathname.slice(-4) == ".css" || pathname.slice(-4) == ".map" || pathname.slice(-4) == "woff")
    {
      util.getSourceFile(pathname, function(result)
      {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(result);
        res.end();
      });
    }
    else if(pathname.slice(-4) == "Page")
    {
      if(numParams == 0)
      {
        pb.generatePage(pathname, function(result){   
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(result);
          res.end();
        });
      }
      else
      {        
        console.log("more than one param");
        pb.generagePageWithParams(pathname, paramObj, function(result){   
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(result);
          res.end();
        });
      }
      
    }
    else if(pathname == "/") //This is the entry point for the main page
    {
      pb.generatePage("main", function(result)
      {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(result);
        res.end();
      
      });
    }
    else if(pathname.slice(-7) == "Request")
    {
      rh.handleClientRequest(pathname, paramObj, function(result)
        {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(result));
          res.end();
        });
    }
    else
    {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write("Not Found, what you tryna do sneakysneaky");
      res.end();
    }    
  }
  else if(req.method == 'POST')
  {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    res.writeHead(200, {'Content-Type': 'text/html'});
    var q  = url.parse(req.url,true).query;

    var body = '';

      req.on('data', function (data) {
          body += data;

          // Too much POST data, kill the connection!
          // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
          if (body.length > 1e6)
              req.connection.destroy();
      });

      req.on('end', function () {
          console.log("this is body:" + body);
          var post = qs.parse(body);

          

          console.log("Name is: " + post.name);
          console.log("desc is: " + post.description);
          console.log("Name is: " + post.date);

          console.log("Name is also: " + post['name']);
          
          db.addToLunches(post.name, post.description, post.date, function(response) 
            {
              //res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(response);
              return res.end();
            });  
      });
  }
}).listen(port);


