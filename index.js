const bodyParser = require('body-parser');
var express = require('express')
const mysqlDao = require('./mysqlDao');
var mongoDao = require('./mongoDao')
var app = express()
app.set('view engine', 'ejs') //setting render engine
app.use(bodyParser.urlencoded({extended: false}))
const { check, validationResult } = require('express-validator');

app.listen(3004, () => {
    console.log("Port is listening on 3004")
})

app.get("/", (req, res) => {
    res.render("home");
});

// Route for displaying students
app.get("/students", (req, res) => {
    mysqlDao.findAllStudents() // Get students from MySQL
      .then((data) => {
        res.render("students", { students: data }); // Pass the students data to EJS
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });

  // Route to render the update form for a student
app.get("/students/edit/:sid", (req, res) => {
    const studentId = req.params.sid;
  
    // Grabbing student details from MySQL
    mysqlDao.findStudentById(studentId)
      .then((student) => {
        res.render("editStudent", { student: student });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });

  // Route to handle updating a student's details
app.post("/students/edit/:sid", (req, res) => {
    const studentId = req.params.sid;
    const { name, age } = req.body; // Get updated name and age from form
  
    // Update student data in MySQL
    mysqlDao.updateStudent(studentId, name, age)
      .then(() => {
        res.redirect("/students"); // Redirect to students list after update
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });

app.get("/grades", (req, res) => {
    res.send("<h1>Grades Page</h1>");
});

app.get("/lecturers", (req, res) => {
    res.send("<h1>Lecturers Page</h1>");
});
