var mssql = require('mssql');
var functions = require('./functions.js');

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
    //Get All Data
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

    //used in Data Viewer search bar
    search: function (Info, callback) {
        var conn = new mssql.ConnectionPool(dbConfig);
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var req = new mssql.Request(conn);
                var objectCount = (Object.keys(Info).length)
                var sql;
                if (objectCount == 2) {
                    sql = 'SELECT * FROM dbo.festivalInfo where ' + Info.attribute + " like '%" + Info.input + "%'";
                } else {
                    sql = 'SELECT * FROM dbo.festivalInfo where ' + Info.attribute1 + " like '%" + Info.input1 + "%' and " + Info.attribute2 + " like '%" + Info.input2 + "%'";
                }
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

    //Get Data based on festivalId
    getFestivalId: function (Info, callback) {
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
                var sql = 'select * from dbo.festivalInfo where festivalId = ' + Info.userInput
                // console.log(sql)
                req.query(sql, function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        // console.log(result.recordset)
                        console.log(functions.calculateTime(result.recordset))
                        return callback(null, result.recordset);
                    }
                });
            }
        })
    },

    //serach based on performanceId
    getPerformanceId: function (id, callback) {
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
    //get the number of records in the database
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

    //Insert data into database(basic) and advanced
    InsertIntoFestivalBulk: function ({ data }, callback) {
        var data2 = { data }.data
        // console.log(data2)
        var conn = new mssql.ConnectionPool(dbConfig);
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Conencted!");
                var req = new mssql.Request(conn);
                var columnNames;
                //check the column table names
                var columnSql = "SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('festivalInfo') "
                req.query(columnSql, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        //get the all the column names in the database
                        columnNames = result.recordset;
                        var objectElementsCount;
                        //database code                
                        //length of database
                        for (let i = 0; i < data2.length; i++) {
                            // console.log(Object.keys(data2[i]).length)
                            // y refers to the column names in the database                            
                            for (let y = 0; y < Object.keys(data2[i]).length; y++) {
                                objectElementsCount = (Object.keys(data2[i]).length);
                                //if statement to check the if the columns in the json data is equal to the column in the database
                                if (columnNames[y].name != (Object.keys(data2[i])[y])) {
                                    return callback(("Error at insert object number " + i), null)
                                }
                            }
                        }                        
                        // console.log(objectElementsCount)
                        //check for basic or advanced insert
                        var sql;
                        if (objectElementsCount == 4) {
                            sql = "insert into festivalInfo (performanceId,festivalId,startTime,endTime) values";
                            for (var i = 0; i < data2.length; i++) {
                                var sqlString = "(" + data2[i].performanceId + "," + data2[i].festivalId + ",'" + data2[i].startTime + "','" + data2[i].endTime + "')"
                                sql += sqlString;
                                if (i < (data2.length - 1)) {
                                    sql += ","
                                }
                            }
                        } else if (objectElementsCount == 5) {
                            sql = "insert into festivalInfo (performanceId,festivalId,startTime,endTime,popularity) values";
                            for (var i = 0; i < data2.length; i++) {
                                var sqlString = "(" + data2[i].performanceId + "," + data2[i].festivalId + ",'" + data2[i].startTime + "','" + data2[i].endTime+ "'," + data2[i].popularity+ ")"
                                sql += sqlString;
                                if (i < (data2.length - 1)) {
                                    sql += ","
                                }
                            }
                        }
                        console.log("\n" + sql + "\n")
                        req.query(sql, function (err, result) {
                            if (err) {
                                console.log(err);
                                return callback(err, null);
                            } else {
                                return callback(null, result.rowsAffected);
                            }
                        });
                    }
                })

            }
        })
    },

}


module.exports = database