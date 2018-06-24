
var MongoClient = require('mongodb').MongoClient;
var dbURL = "mongodb+srv://zhongfanadmin:ZhongFan042004@zhongfan-mongodb-zplyp.mongodb.net";

module.exports = {  
  addToLunches: function(lunchName, description, date, callback)
  {
    MongoClient.connect(dbURL, function(err, db) 
    {
      if (err) 
      {
        throw err;
      }
      var dbo = db.db("ZhongFan");


   
      var myobj = { Name: lunchName, Description:description, Date:date };

      dbo.collection("Lunches").insertOne(myobj, function(err, res) 
      {
        if (err) 
        {
           callback(err);
           throw err;

        }

        callback("Inserted");
        console.log("1 document inserted");
        db.close();
      });

    }); 
  }
  ,
  getAllLunches: function(callback)
  {
    MongoClient.connect(dbURL, function(err, db) 
    {
      if (err) throw err;
      var dbo = db.db("ZhongFan");
      dbo.collection("Lunches").find({}).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        callback(result);
      });

    });
  }
}