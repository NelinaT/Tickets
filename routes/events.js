const express =require("express");
const router = express.Router();

var mysql = require("mysql");

router.get('/getAllEvents', takePopularEvents, takeUpcommingEvents);

router.get('/getEvent', (res, req) => {
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

function takePopularEvents(req, res, next){
    var queryString = `
    SELECT 
        e.id,
        e.name as eventName,
        e.start_date,
        e.end_date,
        et.name as eventType,
        c.city,
        p.place
    FROM 
        events e,
        event_type et,
        places p,
        cities c
    WHERE
        e.type_id = et.id AND
        p.id=e.place_id AND
        c.id= p.city_id`;

    conection.query(queryString, (err, rows) => {
        if(err){
            console.error(err);
            res.sendStatus(500);
        }
        else{
            if(rows.length){
                res.resObj={popularEvents: rows};
                next();
            }
            else {
                res.sendStatus(404);
            }
        }
    });
}

function takeUpcommingEvents(req,res,next){
    var queryString = `
        SELECT 
            e.id,
            e.name as eventName,
            e.start_date,
            e.end_date,
            et.name as eventType,
            c.city,
            p.place
        FROM 
            events e,
            event_type et,
            places p,
            cities c
        WHERE
            e.type_id = et.id AND
            p.id=e.place_id AND
            c.id= p.city_id;`;

    conection.query(queryString, (err, rows) => {
        if(err){
            console.error(err);
            res.sendStatus(500);
        }
        else{
            if(rows.length){
                res.resObj.upcommingEvents=rows;
                res.json(res.resObj);
            }
            else {
                res.sendStatus(404);
            }
        }
    });

}
module.exports = router;