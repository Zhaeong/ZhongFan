
var mongo = require('mongodb');
var dbURL = "mongodb+srv://zhongfanadmin:ZhongFan042004@zhongfan-mongodb-zplyp.mongodb.net";

module.exports = {  
  addToLunches: function(lunchName, description, date, callback)
  {
    mongo.MongoClient.connect(dbURL, function(err, db) 
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
    mongo.MongoClient.connect(dbURL, function(err, db) 
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
  ,
  getLunchInfo: function(lunchID, callback)
  {

    console.log("trying to get info of: " + lunchID);

    var o_id = new mongo.ObjectID(lunchID);
    var query = { _id: o_id };

    mongo.MongoClient.connect(dbURL, function(err, db) 
    {
      if (err) throw err;
      var dbo = db.db("ZhongFan");
      dbo.collection("Lunches").findOne(query, function(err, result) {
        if (err) throw err;       
        callback(result);
        db.close();
      });
    }); 
  }
  ,
  updateLunchInfo: function(lunchID, lunchName, lunchDesc, lunchDate, lunchRating, callback)
  {
    var o_id = new mongo.ObjectID(lunchID);
    var query = { _id: o_id };
    var myobj = { Name: lunchName, Description:lunchDesc, Date:lunchDate, Rating:lunchRating };

    mongo.MongoClient.connect(dbURL, function(err, db) 
    {
      if (err) throw err;
      var dbo = db.db("ZhongFan");

      dbo.collection("Lunches").updateOne(query, {$set: myobj}, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        callback("SUCCESS");
        db.close();
      });
    }); 
  }

  ,

  deleteLunchItem: function(lunchID, callback)
  {
    mongo.MongoClient.connect(dbURL, function(err, db) {
    if (err) throw err;
    var dbo = db.db("ZhongFan");
    var o_id = new mongo.ObjectID(lunchID);
    var query = { _id: o_id };

    dbo.collection("Lunches").deleteOne(query, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      callback("DELETED");
      db.close();
    });
  }); 
  }
}