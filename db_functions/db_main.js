
var MongoClient = require('mongodb').MongoClient;
var dbURL = "mongodb+srv://zhongfanadmin:ZhongFan042004@zhongfan-mongodb-zplyp.mongodb.net";

module.exports = {  
  addToLunches: function(lunchName)
  {
    MongoClient.connect(dbURL, function(err, db) 
    {
      if (err) 
      {
        throw err;
      }
      var dbo = db.db("ZhongFan");


   
      var myobj = { lunchName: lunchName };

      dbo.collection("Lunches").insertOne(myobj, function(err, res) 
      {
        if (err) 
        {
           throw err;
        }
        console.log("1 document inserted");
        db.close();
      });

    }); 
  },

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