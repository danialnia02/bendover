var express = require('express');
var app = express();
var musicDb = require('../model/database.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var path = require('path');



app.use(bodyParser.json());
app.use(urlencodedParser);
app.use('/', express.static('../frontend'))
var cors = require('cors')
app.use(cors());


//reset and recreate the table
app.get('/reset', function (req, res) {

    musicDb.resetTable2(function (error, result) {
        if (error) {
            console.log(error);
            return res.json({ error: error });
        }
        return res.json({ success: true });
    });
});

//Get All Data
app.get('/basic/data', function (req, res) {

    musicDb.getAllfestivalInfo(function (error, result) {
        if (error) {
            console.log(error);
            return res.json({ error: error });
        }
        res.send(result);
    });
});

app.get('/advance/data', function (req, res) {

    musicDb.getAllfestivalInfo(function (error, result) {
        if (error) {
            console.log(error);
            return res.json({ error: error });
        }
        res.send(result);
    });
});

//get festivalId for basic
app.get('/basic/result', function (req, res, next) {
    const { festivalId } = req.query;
    musicDb.getAllfestivalInfoBasic(festivalId, function (err, result) {
        if (err) {
            return next(err);
        } else {
            console.log('/basic/result -Result', result)
            res.json(result);
        }
    })
})

//get festivalId for result
app.get('/advance/result', function (req, res, next) {

    const { festivalId } = req.query;

    musicDb.getAllfestivalInfoAdvance(festivalId,function (err, result) {
        if (err) {
            return next(err);
        } else {
            console.log('/basic/result -Result', result)
            res.json(result);
        }
    })
})


app.use(function (err, req, res, next) {
    return res.json({
        error: err.message, code: 500

    })
})

//search basic on performanceId
app.get('/basic/result/:performanceId', function (req, res) {

    id = req.params.performanceId    

    musicDb.getPerformanceId(id, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            console.log(err)
            res.status(500).send('Unkown error\nCode:500 Internal Server Error.')
        }
    })
})

//search advance based on performanceId
app.get('/advance/result/:performanceId', function (req, res) {

    id = req.params.performanceId    

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

    if (attribute1 == "" || attribute1=="undefined" || attribute1==null) {
        console.log("here1");
        Info = {
            attribute: attribute2,
            input: input2
        }
    } else if (attribute2 == "" || attribute2=="undefined" || attribute2==null) {
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

    musicDb.search(Info, function (err, result) {
        if (!err) {
            console.log(result)
            res.send({result})
        } else {
            res.status(500).send('Unknown error\nCode:500 Internal Server Error.')
        }
    })
})

//basic insert
app.post('/basic/insert', function (req, res) {
    var { data } = req.body
    console.log({ data })

    musicDb.InsertIntoFestivalBulk2(data, function (err, result) {
        if (!err) {
            res.status(200).send(JSON.parse('{"result":"success"}'));
        } else if (err.errno == 1048) {
            res.status(400).send(JSON.parse('{"error":"Null Entry","code":400}'));
        } else if (err.errno == 1062) {
            res.status(400).send(JSON.parse('{"error":"Duplicate Entry","code":400}'));
        } else {
            res.status(500).send(JSON.parse('{"error":"Server Error","code":500}'));
        }
    })
})
//advance insert
app.post('/advance/insert', function (req, res) {
    var { data } = req.body
    console.log({ data })

    musicDb.InsertIntoFestivalBulk2(data, function (err, result) {
        if (!err) {
            res.status(200).send(JSON.parse('{"result":"success"}'));
        } else if (err.errno == 1048) {
            res.status(400).send(JSON.parse('{"error":"Null Entry","code":400}'));
        } else if (err.errno == 1062) {
            res.status(400).send(JSON.parse('{"error":"Duplicate Entry","code":400}'));
        } else {
            res.status(500).send(JSON.parse('{"error":"Server Error","code":500}'));
        }
    })
})

//get the number of records in the database
app.get('/advance/recordCount', function (req, res) {

    musicDb.recordCounter(function (err, result) {
        if (!err) {
            console.log(result)
            res.send({result});
        } else {
            console.log(err)
            res.status(500).send('Unkown error\nCode:500 Internal Server Error.')
        }
    })
})
module.exports = app