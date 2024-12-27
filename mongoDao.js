const MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://127.0.0.1:27017")
  .then((client) => {
    db = client.db("proj2024MongoDB"); // Using the mongoDB client and lecturers collection
    coll = db.collection("lecturers");
  })
  .catch((error) => {
    console.log(error.message);
  });

  var findAllLecturers = function () {
    return new Promise((resolve, reject) => {
      var cursor = coll.find(); // Retrieves all documents from the "lecturers" collection
      cursor
        .toArray()
        .then((documents) => {
          resolve(documents);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  module.exports = {
    findAllLecturers
  };