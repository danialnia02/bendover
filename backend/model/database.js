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

    //used in Data Viewer search bar
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
                var objectCount=(Object.keys(Info).length)                
                var sql;
                if (objectCount==2){
                    sql='SELECT * FROM dbo.festivalInfo where '+Info.attribute +" like '%"+Info.input+"%'";
                }else{
                    sql='SELECT * FROM dbo.festivalInfo where '+Info.attribute1+" like '%"+Info.input1+"%' and "+Info.attribute2+" like '%"+Info.input2+"%'";
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
                var sql = 'select * from dbo.festivalInfo where festivalId =' + Info.userInput
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
    InsertIntoFestivalBulk: function ({ data }, callback) {
        console.log({ data })
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
    },
    InsertIntoFestivalBulk: function ({ data }, callback) {
        var data2 = { data }.data
        console.log(data2)
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
                        columnNames = result.recordset;

                        // console.log(columnNames[0].name);
                        var penis=0;
                        //database code                
                        for (let i = 0; i < data2.length; i++) {
                            console.log(Object.keys(data2[i]).length)
                            for (let y = 0; y < Object.keys(data2[i]).length; y++) {                                
                                // console.log(Object.values(data2[i])[y]);
                                
                                if(columnNames[y].name!=(Object.keys(data2[i])[y])){
                                    console.log(Object.keys(data2[i])[y]);                                                 
                                    return callback( "undefined",null)
                                }                                
                            }
                        }                    

                        var sql = "insert into festivalInfo (performanceId,festivalId,startTime,endTime) values";
                        for (var i = 0; i < data2.length; i++) {
                            var sqlString = "(" + data2[i].performanceId + "," + data2[i].festivalId + ",'" + data2[i].startTime + "','" + data2[i].endTime + "')"
                            sql += sqlString;
                            if (i < (data2.length - 1)) {
                                sql += ","
                            }
                        }                        
                        // console.log("\n" + sql + "\n")
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
    InsertIndividual: function (data, callback) {
        console.log(data[0])
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
                var sql = "insert into dbo.festivalInfo (performanceId,festivalId,startTime,endTime) values("
                    + data.data[0].performanceId + ","
                    + data.data[0].festivalId + ","
                    + data.data[0].startTime + ","
                    + data.data[0].endTime
                    + ")";
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