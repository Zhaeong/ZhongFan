var http = require('http');
var url = require('url');
var fs = require('fs');

var qs = require('querystring');



global.__basedir = __dirname;

var pb = require('./page_functions/page_builder.js')


var MongoClient = require('mongodb').MongoClient;
var dbURL = "mongodb+srv://zhongfanadmin:ZhongFan042004@zhongfan-mongodb-zplyp.mongodb.net";


var port = process.env.PORT || 8080;

http.createServer(function (req, res) {

	var q = url.parse(req.url, true);

	console.log("The path is:" + q.pathname);


	var filename = "." + q.pathname;

	if(q.pathname == "/")
  	{
      pb.generateMainPage(function(result){
        var mainPageVal = result;        
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(mainPageVal);
        res.end();
      });
  	}

  if(req.method == 'POST')
  {

    console.log("This is post:");
    //console.log(req);
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

            addToLunches(post.Name);

            res.writeHead(200, {'Content-Type': 'text/html'});
            return res.end();
        });
  }
}).listen(port);


function addToLunches(lunchName)
{

  MongoClient.connect(dbURL, function(err, db) {
  if (err) 
   {
     throw err;
   }
  var dbo = db.db("ZhongFan");


 
  var myobj = { lunchName: lunchName };

  dbo.collection("Lunches").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
}); 

}
