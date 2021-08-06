const express = require('express');
const { poolPromise } = require('../db');

const router = express.Router();

/**
 * Checks if user id and password exists on db
 */

router.post('/', async (req, resp) => {
    try {
        const { login, password } = req.body;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .query(
                `SELECT memb___id FROM MEMB_INFO WHERE memb___id = '${login}' AND memb__pwd = '${password}'`
            );

        resp.json(result.recordset);
    } catch (err) {
        resp.status(500).send(err.message);
    }
});

module.exports = router;
