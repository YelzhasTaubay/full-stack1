const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "e2596781234",
    host: "localhost",
    port: 5432,
    database: "perntodo"
})

module.exports = pool;
