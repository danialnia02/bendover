var express = require('express');
var app = express();
var musicDb = require('../model/database.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var formidableMiddleware = require('express-formidable')
var path = require('path');



app.use(bodyParser.json());
app.use(urlencodedParser);
// app.use(express.static("frontend"));
app.use('/', express.static('../frontend'))
// app.use(cors());

var multer = require('multer');
var multParse = multer();

//Select * from music Info  
app.get('/advance/results', function (req, res) {

    musicDb.getAllfestivalInfo(function (err, result) {
        if (!err) {
            res.send(result);
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

//get the name of the header
app.get('/advance/header', function (req, res) {

    musicDb.getAllfestivalInfoHeader(function (err, result) {
        if (!err) {
            // console.log(result)
            res.send(result);
        } else {
            res.status(500).send('Unkown error\nCode:500 Internal Server Error.')
        }
    })
})

//get the number of records in the database
app.get('/advance/recordCount', function (req, res) {

    musicDb.recordCounter(function (err, result) {
        if (!err) {            
            res.send(result);
        } else {
            res.status(500).send('Unkown error\nCode:500 Internal Server Error.')
        }
    })
})

module.exports = app