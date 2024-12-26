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
  
  function addStudent(sid, name, age) {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO student (sid, name, age) VALUES (?, ?, ?)", [sid, name, age], 
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        );
    });
}

// Function to check if the student ID already exists
function checkStudentExists(sid) {
  return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM student WHERE sid = ?", [sid], (error, results) => {
          if (error) {
              reject(error);
          } else {
              resolve(results.length > 0); // If there's a result, the ID exists
          }
      });
  });
}

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
      `;

      connection.query(query, (error, results) => {
          if (error) {
              reject(error);
          } else {
              resolve(results);
          }
      });
  });
};

module.exports = {
  findAllStudents, findStudentById, updateStudent, addStudent, checkStudentExists, getGrades
};
