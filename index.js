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

    mysqlDao.findStudentById(studentId)
        .then((student) => {
            res.render("editStudent", {
                student: student, // Pass the student details
                errors: [], // Ensure errors is defined so .ejs file can read it in
            });
        })
        .catch((error) => {
            console.log(error);
            res.send(error);
        });
});

//Handling when user edits a student
app.post("/students/edit/:sid", 
    [
        // Stipulations for updating a student
        check("name").isLength({ min: 2 }).withMessage("Name should be a minimum of 2 characters."),
        check("age").isInt({ min: 18 }).withMessage("Age should be 18 or older."),
    ],
    (req, res) => {
        const errors = validationResult(req); // Validate request body
        const studentId = req.params.sid;

        if (!errors.isEmpty()) {
            // If the data entered does not follow the stipulations, refresh the update page with error messages
            res.render("editStudent", {
                student: { sid: studentId, name: req.body.name, age: req.body.age }, // Preserve entered data
                errors: errors.errors, // Pass error messages
            });
        } else {
            // If there are no error messages, sucessfully update the student
            mysqlDao.updateStudent(studentId, req.body.name, req.body.age)
                .then(() => {
                    res.redirect("/students"); // Redirect to students page on success
                })
                .catch((error) => {
                    console.log(error);
                    res.send(error); 
                });
        }
    }
);


app.get("/grades", (req, res) => {
    res.send("<h1>Grades Page</h1>");
});

app.get("/lecturers", (req, res) => {
    res.send("<h1>Lecturers Page</h1>");
});
