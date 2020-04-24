const { Client } = require('pg') // pool restricts the number of clients
const CONNECTION_STRING = '	postgres://jfkdisbe:NO9XOzOtwwnPlBhtS-MDCzqApCca63mf@john.db.elephantsql.com:5432/jfkdisbe';

function connect() {
    const client = new Client({
        connectionString: CONNECTION_STRING,
    })
    client.connect();
    return client;
}

function resetTable() {
    const client = connect()
    const query = `
    DROP TABLE IF EXISTS coin;
    CREATE TABLE coin(
        id SERIAL PRIMARY KEY,
        coin_id INTEGER UNIQUE,
        country_id INTEGER,
        value INTEGER
    )`;
    client.query(query, (err, res) => {
        console.log(err, res)
        client.end()
    })
}

function insertCoins(coins, callback) {
    let i = 1;
    const template = coins.map((coin) => `($${i++},$${i++},$${i++})`).join(',');
    const values = coins.reduce((reduced, coin) => [...reduced, coin.coinId, coin.countryId, coin.value], [])
    const query = `INSERT INTO coin(coin_id,country_id,value) VALUES ${template};`;

    const client = connect();
    client.query(query, values, (err, result) => {
        callback(err, result)
        client.end();
    })
}

function getCoins(countryId, value_gt, page = 0, pageSize = 10, callback) {
    let whereClause;
    let i = 1
    const values = [];
    if (!countryId && !value_gt) whereClause = '';
    else {
        whereClause = 'WHERE ';
        if (countryId) {
            whereClause += ` country_id= $${i++}`;
            values.push(parseInt(countryId));
        }
        if (value_gt) {
            whereClause += countryId ? ` AND value > $${i++}` : `value > $${i++}`;
        }
        values.push(parseInt(value_gt));
    }

    let limitOffsetClause = `LIMIT $${i++} OFFSET $${i++}`
    values.push(parseInt(pageSize)); // limit = page size
    values.push(parseInt(page) * parseInt(pageSize)); //offset =page * pageSize
    const query = `SELECT * FROM coin ${whereClause} ${limitOffsetClause}`

    // console.log(query, values);
    // callback(null, { ok: 'ok' })
    const client = connect();
    client.query(query, values, function (err, {rows}) {
        client.end();
        callback(err, rows);

    })
}

module.exports = {
    resetTable,
    insertCoins,
    getCoins
}