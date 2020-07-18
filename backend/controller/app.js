var express = require('express');
var app = express();
var musicDb = require('../model/database.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var formidableMiddleware = require('express-formidable')
var path = require('path');



app.use(bodyParser.json());
app.use(urlencodedParser);
app.use('/', express.static('../frontend'))
var cors = require('cors')
app.use(cors());

var multer = require('multer');
var multParse = multer();

//Get All Data
app.get('/basic/data', function (req, res) {

    console.log("here")

    musicDb.getAllfestivalInfo(function (err, result) {
        if (!err) {
            res.send(result)
        } else {
            res.status(500).send({ error: 'server Error', code: 500 })
        }
    })
})
//Get All Data 2
app.get('/advance/data', function (req, res) {

    console.log("here")

    musicDb.getAllfestivalInfo(function (err, result) {
        if (!err) {
            res.send(result)
        } else {
            res.status(500).send({ error: 'server Error', code: 500 })
        }
    })
})

//Get Data based on festivalId
app.get('/basic/result/:festivalid', function (req, res) {
    var Info = {
        userInput: req.params.festivalid
    }
    // console.log(Info);

    musicDb.getFestivalId(Info, function (err, result) {
        if (!err) {
            // console.log(result)
            res.send(result)
        } else {
            if (err == "null") {
                res.status(500).send({ error: 'Error with festivalId Input', code: 500 })
            } else {
                res.status(500).send({ error: 'String', code: 500 })
            }
        }
    })
})
app.get('/advance/result/:festivalid', function (req, res) {
    var Info = {
        userInput: req.params.festivalid
    }
    // console.log(Info);

    musicDb.getFestivalId2(Info, function (err, result) {
        if (!err) {
            // console.log(result)            
            res.send(result)
        } else {
            if (err == "null") {
                res.status(500).send({ error: 'Error with festivalId Input', code: 500 })
            } else {
                res.status(500).send({ error: 'String', code: 500 })
            }
        }
    })
})

//serach based on performanceId
app.get('/basic/results/:performanceId', function (req, res) {

    id = req.params.performanceId
    console.log(id)

    musicDb.getPerformanceId(id, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            console.log(err)
            res.status(500).send('Unkown error\nCode:500 Internal Server Error.')
        }
    })
})

//Get Data based on search bar in Data Viewer
app.post('/search', function (req, res) {    
    var attribute1 = req.body.attribute1;
    var input1 = req.body.input1;
    var attribute2 = req.body.attribute2;
    var input2 = req.body.input2
    var Info;

    console.log(attribute1, input1, attribute2, input2)

    if (attribute1 == "") {
        console.log("here1");
        Info = {
            attribute: attribute2,
            input: input2
        }
    } else if (attribute2 == "") {
        console.log("here2");
        Info = {
            attribute: attribute1,
            input: input1
        }
    } else {
        Info = {
            attribute1: attribute1,
            input1: input1,
            attribute2: attribute2,
            input2: input2
        }
    }

    console.log(Info)

    musicDb.search(Info, function (err, result) {
        if (!err) {
            console.log(result)
            res.send(result)
        } else {
            res.status(500).send('Unknown error\nCode:500 Internal Server Error.')
        }
    })
})
//Insert data into database(basic)
app.post('/basic/insert', function (req, res) {
    var { data } = req.body
    // console.log({data})

    musicDb.InsertIntoFestivalBulk({ data }, function (err, result) {
        if (!err) {

            res.send("Your data has been inserted!");
        } else {
            var string;
            if (err == "undefined") {
                errOutput = "Something is undefined."
                res.send(errOutput)
            }
            switch (err.number) {
                case 207: string = "Invalid input"
                    break;
                case 2627: string = "Duplicate entries"
                    break;
                case 8114: string = "Invalid input"
                    break;
                default: string = "Other error"
            }
            res.send("{\"error\":" + string + ",\"code\":" + err.number + "}")
        }
    })
})

app.post('/advance/insert', function (req, res) {
    var { data } = req.body
    // console.log({data})

    musicDb.InsertIntoFestivalBulk({ data }, function (err, result) {
        if (!err) {

            res.send(result);
        } else {
            var string;
            if (err == "undefined") {
                errOutput = "Something is undefined."
                res.send(errOutput)
            }
            switch (err.number) {
                case 207: string = "Invalid input"
                    break;
                case 2627: string = "Duplicate entries"
                    break;
                case 8114: string = "Invalid input"
                    break;
                default: string = "Other error"
            }
            res.send("{\"error\":" + string + ",\"code\":" + err.number + "}")
        }
    })
})

//get the number of records in the database
app.get('/advance/recordCount', function (req, res) {

    musicDb.recordCounter(function (err, result) {
        if (!err) {
            console.log(result)
            res.send(result);
        } else {
            console.log(err)
            res.status(500).send('Unkown error\nCode:500 Internal Server Error.')
        }
    })
})
module.exports = app