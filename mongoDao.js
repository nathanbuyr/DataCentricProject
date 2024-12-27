const MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://127.0.0.1:27017")
  .then((client) => {
    db = client.db("proj2024MongoDB"); // Using the mongoDB client and lecturers collection
    coll = db.collection("lecturers");
  })
  .catch((error) => {
    console.log(error.message);
  });

// Find all lecturers and sort them by their _id field in ascending order
var findAllLecturers = function () {
  return new Promise((resolve, reject) => {
    coll
      .find()
      .sort({ _id: 1 })
      .toArray() // 1 sorts in ascending order
      .then((lecturers) => {
        resolve(lecturers);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Function to delete a lecturer from MongoDB
var deleteLecturer = function (lecturerId) {
  return new Promise((resolve, reject) => {
    coll
      .deleteOne({ _id: lecturerId })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  findAllLecturers,
  deleteLecturer,
};
