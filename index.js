const bodyParser = require("body-parser");
var express = require("express");
const mysqlDao = require("./mysqlDao");
var mongoDao = require("./mongoDao");
var app = express();
app.set("view engine", "ejs"); //setting render engine
app.use(bodyParser.urlencoded({ extended: false }));
const { check, validationResult } = require("express-validator");

app.listen(3004, () => {
  console.log("Port is listening on 3004");
});

app.get("/", (req, res) => {
  res.render("home");
});

// Route for displaying students
app.get("/students", (req, res) => {
  const sortField = req.query.sort || "sid"; // Default sort by sid
  const sortOrder = req.query.order == "desc" ? -1 : 1; // Default to ascending order

  mysqlDao
    .findAllStudents()
    .then((students) => {
      // Sort students
      students.sort((a, b) => {
        if (a[sortField] < b[sortField]) {
          return -1 * sortOrder;
        }
        if (a[sortField] > b[sortField]) {
          return 1 * sortOrder;
        }
        return 0;
      });

      res.render("students", { students });
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

// Route to render the update form for a student
app.get("/students/edit/:sid", (req, res) => {
  const studentId = req.params.sid;

  mysqlDao
    .findStudentById(studentId)
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
app.post(
  "/students/edit/:sid",
  [
    // Stipulations for updating a student
    check("name")
      .isLength({ min: 2 })
      .withMessage("Name should be a minimum of 2 characters."),
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
      mysqlDao
        .updateStudent(studentId, req.body.name, req.body.age)
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

app.get("/students/add", (req, res) => {
  res.render("addStudent", { student: {}, errors: [] });
});

app.post(
  "/students/add",
  [
    check("sid")
      .isLength({ min: 4, max: 4 })
      .withMessage("Student ID must be 4 characters."),
    check("name")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters."),
    check("age").isInt({ min: 18 }).withMessage("Age must be 18 or older."),
    check("sid").custom(async (sid) => {
      // Creating a custom check to see if ID exists in the database
      const exists = await mysqlDao.checkStudentExists(sid);
      if (exists) {
        throw new Error("Student ID already exists.");
      }
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("addStudent", {
        student: req.body,
        errors: errors.errors,
      });
    } else {
      mysqlDao
        .addStudent(req.body.sid, req.body.name, req.body.age)
        .then(() => {
          res.redirect("/students");
        })
        .catch((error) => {
          console.log(error);
          res.send(error);
        });
    }
  }
);

app.get("/students/delete/:sid", (req, res) => {
  const studentId = req.params.sid;

  // Call the MySQL DAO to delete the student
  mysqlDao
    .deleteStudent(studentId)
    .then(() => {
      res.redirect("/students");
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

app.get("/grades", (req, res) => {
  const sortField = req.query.sort || "studentName"; // Default sort by studentName
  const sortOrder = req.query.order == "desc" ? -1 : 1; // Default to ascending order

  mysqlDao
    .getGrades()
    .then((grades) => {
      // Sort grades based on the query parameters
      grades.sort((a, b) => {
        if (a[sortField] < b[sortField]) {
          return -1 * sortOrder;
        }
        if (a[sortField] > b[sortField]) {
          return 1 * sortOrder;
        }
        return 0;
      });

      res.render("grades", { grades });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error retrieving grades");
    });
});

app.get("/lecturers", (req, res) => {
  const sortField = req.query.sort || "_id"; // Default sort by _id
  const sortOrder = req.query.order == "desc" ? -1 : 1; // Default to ascending order

  mongoDao
    .findAllLecturers()
    .then((lecturers) => {
      // Sort lecturers based on the query parameters
      lecturers.sort((a, b) => {
        if (a[sortField] < b[sortField]) {
          return -1 * sortOrder;
        }
        if (a[sortField] > b[sortField]) {
          return 1 * sortOrder;
        }
        return 0;
      });

      res.render("lecturers", { lecturers, error: null });
    })
    .catch((error) => {
      res.render("lecturers", { lecturers: [], error: error.message });
    });
});

app.get("/lecturers/delete/:id", (req, res) => {
  const lecturerId = req.params.id;

  // Check if the lecturer teaches any module
  mysqlDao
    .checkLecturerModules(lecturerId)
    .then((moduleCount) => {
      if (moduleCount > 0) {
        // If lecturer teaches any modules, send an error message
        mongoDao
          .findAllLecturers()
          .then((lecturers) => {
            res.render("lecturers", {
              lecturers: lecturers,
              error:
                "Cannot delete lecturer because they are teaching one or more modules.",
            });
          })
          .catch((error) => {
            console.log(error);
            res.send(error);
          });
      } else {
        // If no modules, proceed with deleting lecturer from MongoDB
        mongoDao
          .deleteLecturer(lecturerId)
          .then(() => {
            res.redirect("/lecturers"); // Redirect back to the lecturers page
          })
          .catch((error) => {
            console.log(error);
            res.send(error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});
