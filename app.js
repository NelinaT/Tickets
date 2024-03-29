const express = require("express");
const app = express();
var path = require('path');
var mysql= require("mysql");

var events = require("./routes/events");

global.conection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "myr00tdb",
    database: 'tickets'
});

conection.connect(err => {
    if (err) {
        console.error("error conecting:"+err.stack);
        return;
    }
    console.log("connected as id "+ conection.threadId );

})

app.set("view engine", "pug")

app.get("/", (req,res) => {
    res.render("index")
});

app.get('/css/*.css', function(req, res) {
    var fileName = '.' + req.originalUrl.substring(0, (req.originalUrl.includes("?") ? req.originalUrl.indexOf("?") : undefined));
    // Double check that we're working in the project folder
    if (fileName.startsWith(".")) {
        res.sendFile(path.resolve(fileName));
    }
    else {
        res.sendStatus(500);
    }
});

app.get('/js/*.js', function(req, res) {
    var fileName = '.' + req.originalUrl.substring(0, (req.originalUrl.includes("?") ? req.originalUrl.indexOf("?") : undefined));
    // Double check that we're working in the project folder
    if (fileName.startsWith(".")) {
        res.sendFile(path.resolve(fileName));
    }
    else {
        res.sendStatus(500);
    }
});
app.get('/images/*', function(req, res) {
    var fileName = '.' + req.originalUrl.substring(0, (req.originalUrl.includes("?") ? req.originalUrl.indexOf("?") : undefined));
    // Double check that we're working in the project folder
    if (fileName.startsWith(".") && 
        (fileName.endsWith('.jpeg') || 
         fileName.endsWith('.png') || 
         fileName.endsWith('.jpg') || 
         fileName.endsWith('.svg') || 
         fileName.endsWith('.gif'))) {
        res.sendFile(path.resolve(fileName));
    }
    else {
        res.sendStatus(403);
    }
});

app.get('/node_modules/jquery*.js', function(req, res) {
    var fileName = '.' + req.originalUrl.substring(0, (req.originalUrl.includes("?") ? req.originalUrl.indexOf("?") : undefined));
    // Double check that we're working in the project folder
    if (fileName.startsWith(".")) {
        res.sendFile(path.resolve(fileName));
    }
    else {
        res.sendStatus(500);
    }
});
app.get('/node_modules/moment*.js', function(req, res) {
    var fileName = '.' + req.originalUrl.substring(0, (req.originalUrl.includes("?") ? req.originalUrl.indexOf("?") : undefined));
    // Double check that we're working in the project folder
    if (fileName.startsWith(".")) {
        res.sendFile(path.resolve(fileName));
    }
    else {
        res.sendStatus(500);
    }
});

app.use('/events', events);

app.listen(3000);