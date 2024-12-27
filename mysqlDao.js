const mysql = require("mysql");

// Create MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "proj2024Mysql", // Name of the database
});

connection.connect(); // Connect to the MySQL database

// Function to fetch all students from the database
var findAllStudents = function () {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM student", (error, results) => {
      if (error) {
        reject(error); // If there's an error, reject the promise
      } else {
        resolve(results); // Send back the list of students
      }
    });
  });
};

// Function to get details of a specific student by their ID
var findStudentById = function (sid) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM student WHERE sid = ?", // Query to find the student
      [sid], // Use parameterized query to prevent SQL injection
      (error, results) => {
        if (error) {
          reject(error); // Pass back any errors
        } else if (results.length === 0) {
          reject(new Error("Student not found")); // Handle case where student doesn't exist
        } else {
          resolve(results[0]); // Send back the found student
        }
      }
    );
  });
};

// Function to update a student's name and age based on their ID
var updateStudent = function (sid, name, age) {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE student SET name = ?, age = ? WHERE sid = ?", // Update query
      [name, age, sid], // Use parameterized values
      (error, results) => {
        if (error) {
          reject(error); // Error handling
        } else {
          resolve(results); // Resolve with the update results
        }
      }
    );
  });
};

// Function to add a new student to the database
function addStudent(sid, name, age) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO student (sid, name, age) VALUES (?, ?, ?)", // Insert query
      [sid, name, age], // Use parameterized values
      (error, results) => {
        if (error) {
          reject(error); // Reject on error
        } else {
          resolve(results); // Resolve on success
        }
      }
    );
  });
}

// Function to delete a student from the database based on their ID
const deleteStudent = (sid) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM student WHERE sid = ?", // Delete query
      [sid], // Use parameterized query
      (err, results) => {
        if (err) {
          reject(err); // Handle errors
        } else {
          resolve(results); // Resolve if successful
        }
      }
    );
  });
};

// Function to check if a student ID already exists in the database
function checkStudentExists(sid) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM student WHERE sid = ?", // Query to check for existing ID
      [sid], // Parameterized query
      (error, results) => {
        if (error) {
          reject(error); // Handle query errors
        } else {
          resolve(results.length > 0); // Return true if ID exists
        }
      }
    );
  });
}

// Function to retrieve grades of students and their modules
const getGrades = () => {
  return new Promise((resolve, reject) => {
    const query = `
          SELECT 
              student.name AS studentName, 
              module.name AS moduleName, 
              grade.grade AS grade
          FROM student
          LEFT JOIN grade ON student.sid = grade.sid
          LEFT JOIN module ON grade.mid = module.mid
          ORDER BY student.name, module.name;
      `; // Query to join student, grade, and module tables

    connection.query(query, (error, results) => {
      if (error) {
        reject(error); // Handle query errors
      } else {
        resolve(results); // Send back the grades
      }
    });
  });
};

// Function to check if a lecturer teaches any modules
var checkLecturerModules = function (lecturerId) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT COUNT(*) AS moduleCount FROM module WHERE lecturer = ?", // Query to count modules taught by a lecturer
      [lecturerId], // Use parameterized query
      (err, results) => {
        if (err) {
          reject(err); // Handle errors
        } else {
          resolve(results[0].moduleCount); // Send back the count of modules
        }
      }
    );
  });
};

// Exporting the functions to be used in other parts of the project
module.exports = {
  findAllStudents,
  findStudentById,
  updateStudent,
  addStudent,
  checkStudentExists,
  getGrades,
  checkLecturerModules,
  deleteStudent,
};
