var mysql = require('mysql');

var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "us-cdbr-east-05.cleardb.net",
            user: "bbeb0921838821",
            password: "51388cc0",
            database: "heroku_94052ba2a67819b"
        });
        return conn;
    }
};
module.exports = dbconnect