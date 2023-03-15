const express =require("express");
const router = express.Router();

var mysql = require("mysql");

router.get('/getAllEvents', (req, res) => {
    var queryString = "SELECT e.id, e.name as eventName, e.start_date,e.end_date,et.name as eventType FROM events e, event_type et WHERE e.type_id = et.id;";

    conection.query(queryString, (err, rows) => {
        if(err){
            console.error(err);
            res.sendStatus(500);
        }
        else{
            res.json(rows);
        }
    });
    
});

router.get('/getEvent', (req, res) => {
    var queryString = "SELECT e.id, e.name as eventName, e.start_date,e.end_date,et.name as eventType FROM events e, event_type et WHERE e.type_id = et.id AND e.id = ?;";
    var queryInserts = [req.query.id];

    queryString = mysql.format(queryString,queryInserts);

    conection.query(queryString, (err, rows) => {
        if(err){
            console.error(err);
            res.sendStatus(500);
        }
        else{
            if(rows.length){
                res.json(rows[0]);
            }
            else {
                res.sendStatus(404);
            }
        }
    });
});

module.exports = router;