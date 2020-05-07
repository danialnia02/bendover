var mssql = require('mssql');


var dbConfig = {
    server: "bendover.database.windows.net",
    database: "MusicDb",
    user: "bendoveradmin",
    password: "/Damenthrall/",
    dialect: "mssql",
    dialectOptions: {
        instanceName: "SQLEXPRESS"
    },
};

var database = {
    getAllfestivalInfo: function (callback) {
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
    getfestivalInfoUser: function (Info, callback) {
        var conn = new mssql.ConnectionPool(dbConfig);
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var req = new mssql.Request(conn);
                var query = "";
                if (Info.userInput != null) {
                    query = 'where ' + Info.attribute + " " + Info.operation + " " + Info.userInput
                }
                if (Info.order != null) {
                    query += " order by " + Info.orderFrom + " " + Info.order
                }
                if (query == undefined) {
                    query = "";
                }
                //database code            

                var sql = 'SELECT * FROM dbo.festivalInfo ' + query;
                console.log(sql)
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
    getAllfestivalInfoHeader: function (callback) {
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
                var sql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'festivalInfo' ORDER BY ORDINAL_POSITION";
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
    recordCounter: function (callback) {
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
                var sql = "select count(*) as recordCount from dbo.festivalInfo";
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


module.exports = database

// SELECT COLUMN_NAME

// FROM INFORMATION_SCHEMA.COLUMNS

// WHERE TABLE_NAME = 'festivalInfo'

// ORDER BY ORDINAL_POSITION