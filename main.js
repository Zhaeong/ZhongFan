var http = require('http');
var url = require('url');
var fs = require('fs');

var qs = require('querystring');



global.__basedir = __dirname;

var pb = require('./page_functions/page_builder.js');
var db = require('./db_functions/db_main.js');

var port = process.env.PORT || 8080;

http.createServer(function (req, res) {

	var q = url.parse(req.url, true);

	console.log("The path is:" + q.pathname);
  console.log("The method is:" + req.method);

  if(req.method == "GET")
  {
    if(q.pathname == "/")
    {
      pb.generateMainPage(function(result){
        var mainPageVal = result;        
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(mainPageVal);
        res.end();
      });
    }
    else if(q.pathname == "/addLunch")
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

            db.addToLunches(post.Name);

            res.writeHead(200, {'Content-Type': 'text/html'});
            return res.end();
        });
  }
}).listen(port);


