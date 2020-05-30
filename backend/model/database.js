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

    getList2: function (Info, callback) {
        var conn = new mssql.ConnectionPool(dbConfig);
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var req = new mssql.Request(conn);

                //database codeionic
                var sql = 'SELECT * FROM dbo.festivalInfo where ' + Info.attribute + " " + Info.operation + " " + "" + Info.userInput + "";
                console.log(sql)
                req.query(sql, function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result.recordset)
                        return callback(null, result.recordset);
                    }
                });
            }
        })
    },

    getid: function (Info, callback) {
        var conn = new mssql.ConnectionPool(dbConfig);
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var req = new mssql.Request(conn);

                //database codeionic
                var sql = 'select * from dbo.festivalInfo where festivalId ='+ Info.userInput
                console.log(sql)
                req.query(sql, function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result.recordset)
                        return callback(null, result.recordset);
                    }
                });
            }
        })
    },


    testing: function (id, callback) {
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
                var sql = 'SELECT * FROM dbo.festivalInfo where performanceId = ' + id;
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
    InsertIntoFestival: function ({data}, callback) {
        console.log({data})
        var conn = new mssql.ConnectionPool(dbConfig);
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Conencted!");
                var req = new mssql.Request(conn);

                //database code
                var sql = "insert into dbo.festivalInfo (performanceId,festivalId,startTime,endTime,popularity) values("
                    + Info.performanceId + ","
                    + Info.festivalId + ","
                    + Info.startTime + ","
                    + Info.endTime                     
                    + ")";
                // var sql = "insert into dbo.festivalInfo (performanceId,festivalId,startTime,endTime,popularity) values(?,?,?,?,?)";
                console.log("\n" + sql + "\n")
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
    }
}


module.exports = database

// SELECT COLUMN_NAME

// FROM INFORMATION_SCHEMA.COLUMNS

// WHERE TABLE_NAME = 'festivalInfo'

// ORDER BY ORDINAL_POSITION