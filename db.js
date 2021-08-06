const sql = require('mssql');
const config = {
    user: 'sa',
    password: '',
    server: 'PRIMAL-PC', // You can use 'localhost\\instance' to connect to named instance
    database: 'MuOnline99',
    encrypt: false,
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch((err) =>
        console.log('Database Connection Failed! Bad Config: ', err)
    );

module.exports = {
    sql,
    poolPromise,
};
