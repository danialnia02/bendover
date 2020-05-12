const express = require('express');
const app = express();
var mssql = require('mssql');
var cors = require('cors')
app.use(cors())

app.listen(8081)

var sql = require("mssql");
var dbConfig = {
    server: "bendover.database.windows.net",
    database: "MusicDb",
    user: "bendoveradmin",
    password: "/Damenthrall/",
    port: 1433,
    dialect: "mssql",
    dialectOptions: {
        instanceName: "SQLEXPRESS"
    },
};



//get
app.get('/test', function (req, res) {
    console.log("here")

    database.getList(function (err, result) {
        if (!err) {
            res.send({ recordset: result })
        } else {
            res.status(500).send('Unkown error\nCode:500 Internal Server Error.')
        }
    })
})


var answer;

var database = {
    getList: function (callback) {
        var conn = new mssql.ConnectionPool(dbConfig);
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var req = new mssql.Request(conn);

                //database code
                var sql = 'SELECT * FROM dbo.festivalInfo ';
                req.query(sql, function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result.recordset);
                    }
                });
            }
        })
    },
}

// export default {

// }
