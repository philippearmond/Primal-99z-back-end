const express = require('express');
const { poolPromise } = require('../db');

const router = express.Router();

/**
 * Counts server accounts
 */
router.get('/', async (req, resp) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            // .input('input_parameter', sql.Int, req.query.input_parameter) req.query é o req http e query da URL, input_parameter é o nome q vou da a URL
            // .query('select * from mytable where id = @input_parameter');
            .query('SELECT COUNT(*) AS [Contas Criadas] FROM MEMB_INFO');

        resp.json(result.recordset);
    } catch (err) {
        resp.status(500);
        resp.send(err.message);
    }
});

module.exports = router;
