var http = require('http');
var url = require('url');
var fs = require('fs');

var qs = require('querystring');

global.__basedir = __dirname;

var pb = require('./page_functions/page_builder.js');
var db = require('./db_functions/db_main.js');

var util = require('./page_functions/utility.js');

var port = process.env.PORT || 8080;

http.createServer(function (req, res) {

	var q = url.parse(req.url, true);

  var pathname = q.pathname;
	console.log("The path is:" + pathname);
  console.log("The params is:");
  console.log(q.query);
  console.log("The method is:" + req.method);

  if(req.method == "GET")
  {
    console.log("concat is: " + pathname.slice(-3));

    //handles file requests of type javascript
    if(pathname.slice(-3) == ".js")
    {
      util.getJavascriptFile(pathname, function(result)
      {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(result);
        res.end();
      });
    }

    if(pathname == "/")
    {
      pb.generateMainPage(function(result){
        var mainPageVal = result;        
        res.writeHead(200, {'Content-Type': 'text/html'});
        
        res.write(mainPageVal);

        db.getAllLunches(function(result)
        {
          for(i = 0; i < result.length; i++)
          {
            res.write(result[i]['lunchName']);
            res.write('<br>');
          }

          res.end();

        });
      });
    }
    else if(pathname == "/addLunch")
    {
      pb.generateAddLunchPage(function(result){   
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(result);
        res.end();
      });
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

          

          console.log("Name is: " + post.Name);

          console.log("Name is also: " + post['Name']);
          
          db.addToLunches(post.Name, function(response) 
            {
              //res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(response);
              return res.end();
            });
          
          
          
      });
  }
}).listen(port);


