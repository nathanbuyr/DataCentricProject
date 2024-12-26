const MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://127.0.0.1:27017")
  .then((client) => {
    db = client.db("proj2024Mysql");
    coll = db.collection("student");
  })
  .catch((error) => {
    console.log(error.message);
  });

