const mysql = require("mysql");

// Create MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "root", 
  database: "proj2024Mysql"
});

connection.connect();

// Function to fetch all students
var findAllStudents = function () {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM student", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results); // This is the student data from MySQL
      }
    });
  });
};

module.exports = {
  findAllStudents
};
