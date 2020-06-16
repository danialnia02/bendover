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

//clearDB mysql code
var db = require('./databaseConfig.js');


var database = {
    //Get All Data
    getAllfestivalInfo: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM festivalInfo ';
                conn.query(sql, function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },
    //used in Data Viewer search bar
    search: function (Info, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var objectCount = (Object.keys(Info).length)
                var sql;
                if (objectCount == 2) {
                    sql = 'SELECT * FROM festivalInfo where ' + Info.attribute + " like '%" + Info.input + "%'";
                } else {
                    sql = 'SELECT * FROM festivalInfo where ' + Info.attribute1 + " like '%" + Info.input1 + "%' and " + Info.attribute2 + " like '%" + Info.input2 + "%'";
                }

                console.log(sql)
                conn.query(sql, function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },
    //Get Data based on festivalId
    getFestivalId: function (Info, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'select * from festivalInfo where festivalId = ' + Info.userInput
                console.log(sql)
                conn.query(sql, function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err, null);
                    } else {                        
                        var result2= result
                        var testResult = functions.calculateTime(result2)    
                        return callback(null, testResult);
                    }
                });
            }
        });
    },
    //search based on performanceId
    getPerformanceId: function (id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM festivalInfo where performanceId = ' + id;
                conn.query(sql, function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },
    //get the number of records in the database
    recordCounter: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = "select count(*) as recordCount from festivalInfo";
                conn.query(sql, function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        console.log(result)
                        return callback(null, result);
                    }
                });
            }
        });
    },
    //Insert data into database(basic) and advanced
    InsertIntoFestivalBulk: function ({ data }, callback) {
        var data2 = { data }.data
        // console.log(data2)
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                console.log("Conencted!");
                var columnNames;
                //check the column table names
                var columnSql = "select column_name as name from information_schema.columns where table_name = 'festivalInfo' "
                conn.query(columnSql, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        //get the all the column names in the database                        
                        columnNames = result;           
                        columnNames1= JSON.stringify(columnNames)

                        console.log("here " + columnNames1)

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
                                var sqlString = "(" + data2[i].performanceId + "," + data2[i].festivalId + ",'" + data2[i].startTime + "','" + data2[i].endTime + "'," + data2[i].popularity + ")"
                                sql += sqlString;
                                if (i < (data2.length - 1)) {
                                    sql += ","
                                }
                            }
                        }
                        console.log("\n" + sql + "\n")
                        conn.query(sql, function (err, result2) {
                            if (err) {
                                console.log(err);
                                return callback(err, null);
                            } else {
                                console.log("hereeee")
                                return callback(null, result2.rowsAffected);
                            }
                        });
                    }
                })
            }
        });
    },
}


module.exports = database