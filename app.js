const express = require("express");
const app = express();
var path = require('path');

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

app.listen(3000);