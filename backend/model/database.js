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
const { Connection } = require('pg');


var database = {
        
    resetTable: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                sql = "DROP TABLE IF EXISTS festivalinfo; CREATE TABLE festivalinfo (performanceId BIGINT(50) NOT NULL, festivalId BIGINT(50) NOT NULL, startTime TIME NOT NULL, endTime TIME NOT NULL, popularity BIGINT(50) NOT NULL, primary KEY(performanceId))"
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

    resetTable2: function (callback) {
        var sql = `DROP TABLE IF EXISTS festivalinfo; `;
        console.log(sql);
        var conn = db.getConnection();
        conn.connect((function (err) {
            conn.query(sql, (err, result) => {
                conn.end();
                database.resetTable23();
                callback(err, result);
            })
        }))
    },

    resetTable23: function () {
        var sql = `CREATE TABLE festivalinfo (performanceId BIGINT(10) NOT NULL, festivalId BIGINT(10) NOT NULL, startTime TIME NOT NULL, endTime TIME NOT NULL, popularity BIGINT(10) NOT NULL, primary KEY(performanceId))`;
        console.log(sql);
        var conn = db.getConnection();
        conn.connect((function (err) {
            conn.query(sql, (err, result) => {
                conn.end();
            })
        }))
    },

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
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    },

    getAllfestivalInfoBasic: function (festivalId, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            var sql;
            if (festivalId) {
                sql = `SELECT * FROM festivalInfo WHERE festivalId = '${festivalId}'`;
            }
            //console.log(sql);
            conn.query(sql, (err, result) => {
                conn.end();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    console.log("here");
                    result = functions.calculateTime(result,festivalId);

                    return callback(null, result)
                }
            })
        });
    },

    getAllfestivalInfoAdvance: function (festivalId, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            var sql;
            if (festivalId) {
                sql = `SELECT * FROM festivalInfo WHERE festivalId = '${festivalId}'`;
            }
            //console.log(sql);
            conn.query(sql, (err, result) => {
                conn.end();
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } else {
                    console.log("here");
                    result = functions.calculateTime2(result,festivalId);

                    return callback(null, result)
                }
            })
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
                        return callback(null, {result});
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
    // InsertIntoFestivalBulk: function (data, callback) {
    //     var conn = db.getConnection();
    //     conn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             return callback(err, null);
    //         }
    //         else {

    //             console.log("connect");
    //             console.log(data)
    //             let i = 1;
    //             const template = data.map(festivalinfo => `(?,?,?,?)`).join(',');
    //             const values = data.reduce((reduced, festivalinfo) => [...reduced, festivalinfo.performanceId, festivalinfo.festivalId, festivalinfo.startTime, festivalinfo.endTime], [])
    //             console.log(values)
    //             var sql = `INSERT INTO festivalinfo(performanceId, festivalId, startTime, endTime, popularity)VALUES ${template};`;

    //             conn.query(sql, values, function (err, result) {

    //                 conn.end();
    //                 if (err) {
    //                     console.log(err);
    //                     return callback(err, null);
    //                 } else {
    //                     //console.log(result);
    //                     return callback(null, result);
    //                 }
    //             });
    //         }
    //     });
    // },

    InsertIntoFestivalBulk2: function (data, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {

                console.log("connect");
                console.log(data)
                let i = 1;
                const template = data.map(festivalinfo => `(?,?,?,?,?)`).join(',');
                const values = data.reduce((reduced, festivalinfo) => [...reduced, festivalinfo.performanceId, festivalinfo.festivalId, festivalinfo.startTime, festivalinfo.endTime, festivalinfo.popularity], [])
                console.log(values)
                var sql = `INSERT INTO festivalinfo(performanceId, festivalId, startTime, endTime, popularity)VALUES ${template};`;

                conn.query(sql, values, function (err, result) {

                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        //console.log(result);
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
}


module.exports = database