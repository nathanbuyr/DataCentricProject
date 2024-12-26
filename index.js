const bodyParser = require('body-parser');
var express = require('express')
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

app.get("/students", (req, res) => {
    res.send("<h1>Students Page</h1>");
});

app.get("/grades", (req, res) => {
    res.send("<h1>Grades Page</h1>");
});

app.get("/lecturers", (req, res) => {
    res.send("<h1>Lecturers Page</h1>");
});
