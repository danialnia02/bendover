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
    const client =connect()
    const query = `
    DROP TABLE IF EXISTS coin;
    CREATE TABLE coin(
        id SERIAL PRIMARY KEY,
        coin_id INTEGER UNIQUE,
        country_id INTEGER,
        value INTEGER
    )`;
    client.query(query,(err, res) => {
        console.log(err, res)
        client.end()
    })
}

module.exports = {
    resetTable,
}