  
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



function getList() {
    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect(function (err) {
        if (err) throw err;
        var req = new sql.Request(conn);

        //databasecode
        req.query("select * from dbo.festivalInfo", function (err, result) {
            if (err) throw err;
            else
                console.log(result);
            conn.close();
        });
        //
    })
}

getList()