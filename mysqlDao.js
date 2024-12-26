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

// Find a student by ID
var findStudentById = function (sid) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM student WHERE sid = ?", [sid], (error, results) => {
        if (error) {
          reject(error); // Reject if error occurs
        } else if (results.length === 0) {
          reject(new Error("Student not found")); // If no student is found, reject with message
        } else {
          resolve(results[0]); // Resolve with student data
        }
      });
    });
  };

  // Update a student's details in MySQL
var updateStudent = function (sid, name, age) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE student SET name = ?, age = ? WHERE sid = ?",
        [name, age, sid],
        (error, results) => {
          if (error) {
            reject(error); // Reject if error occurs
          } else {
            resolve(results); // Resolve if update is successful
          }
        }
      );
    });
  };
  

module.exports = {
  findAllStudents, findStudentById, updateStudent
};
