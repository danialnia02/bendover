var express = require('express');
var app = express();
var musicDb = require('../model/database.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var formidableMiddleware = require('express-formidable')
var path = require('path');

app.use(bodyParser.json());
app.use(urlencodedParser);

var multer = require('multer');
var multParse = multer();

app.get('/test/', function (req, res) {

    musicDb.test(function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send('Unkown error\nCode:500 Internal Server Error.')
        }
    })
})

module.exports= app