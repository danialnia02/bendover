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

//get all info
app.get('/basic/results', function (req, res) {

    console.log("here")

    musicDb.getAllfestivalInfo(function (err, result) {
        if (!err) {
            res.send(result)
        } else {
            res.status(500).send({ error: 'String', code: 500 })
        }
    })
})

//get individual info
app.get('/basic/result/:festivalid', function (req, res) {
    var Info = {
        userInput: req.params.festivalid
    }

    console.log("here2")
    console.log(Info);

    musicDb.getid(Info, function (err, result) {
        if (!err) {
            res.send(result)
        } else {
            res.status(500).send({ error: 'String', code: 500 })
        }
    })
})

//Select * from music Info  
app.get('/advance/result', function (req, res) {

    musicDb.getAllfestivalInfo(function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send({ error: 'String', code: 500 })
        }
    })
})

//used in Data Viewer search bar
app.post('/search', function (req, res) {
    var operation = req.body.operation;
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

    musicDb.getList2(Info, function (err, result) {
        if (!err) {
            res.send(result)
        } else {
            res.status(500).send('Unknown error\nCode:500 Internal Server Error.')
        }
    })
})
//insert for basic
app.post('/basic/insert', function (req, res) {
    var { data } = req.body
    // console.log({data})

    musicDb.InsertIntoFestivalBulk({ data }, function (err, result) {
        if (!err) {

            res.send("Your data has been inserted!");
        } else {
            var result = err;
            if (result == "undefined") {
                result = "Something is undefined."
            }
            res.send(result)
            // res.status(500).send('Unknown error\nCode:500 Interval Server Error.')
        }
    })
})
//insert for advance
app.post('/advance/insert', function (req, res) {
    var Info = {
        performanceId: req.body.performanceId,
        festivalId: req.body.festivalId,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        popularity: req.body.popularity,
    }
    // res.send(Info)

    musicDb.InsertIntoFestival(Info, function (err, result) {
        if (!err) {
            res.send("Your data has been inserted!");
        } else {
            res.status(500).send('Unknown error\nCode:500 Interval Server Error.')
        }
    })
})

app.get('/advance/results/:id', function (req, res) {

    id = req.params.id

    musicDb.testing(id, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send('Unkown error\nCode:500 Internal Server Error.')
        }
    })
})

app.get('/advance/results2', function (req, res) {

    musicDb.getAllfestivalInfo(function (err, result) {
        if (!err) {
            res.send({ recordset: result });
        } else {
            res.status(500).send('Unkown error\nCode:500 Internal Server Error.')
        }
    })
})

app.post('/advance/result/', function (req, res) {
    var Info;
    if (req.body.userInput == "" || req.body.userInput == null) {
        Info = {
            attribute: req.body.attribute,
            operation: req.body.operation,
            order: req.body.order,
            orderFrom: req.body.orderFrom,
            userInput: null

        }
    } else {
        Info = {
            attribute: req.body.attribute,
            operation: req.body.operation,
            order: req.body.order,
            orderFrom: req.body.orderFrom,
            userInput: req.body.userInput,
        }
    }

    musicDb.getfestivalInfoUser(Info, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send('Unknown error\nCode:500 Internal Server Error');
        }
    });
});

app.get('/advance/result/', function (req, res) {
    var Info;
    if (req.body.userInput == "" || req.body.userInput == null) {
        Info = {
            attribute: req.body.attribute,
            operation: req.body.operation,
            order: req.body.order,
            orderFrom: req.body.orderFrom,
            userInput: null

        }
    } else {
        Info = {
            attribute: req.body.attribute,
            operation: req.body.operation,
            order: req.body.order,
            orderFrom: req.body.orderFrom,
            userInput: req.body.userInput,
        }
    }

    musicDb.getfestivalInfoUser(Info, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send('Unknown error\nCode:500 Internal Server Error');
        }
    });
});



//get the number of records in the database
app.get('/advance/recordCount', function (req, res) {

    musicDb.recordCounter(function (err, result) {
        if (!err) {
            console.log(result)
            res.send(result);
        } else {
            res.status(500).send('Unkown error\nCode:500 Internal Server Error.')
        }
    })
})

app.get('/advance/random', function (req, res) {

    res.send("{1,1,1}")
})

module.exports = app