const express = require('express');
const { poolPromise } = require('../db');

const router = express.Router();

/**
 * Count users online in game
 */

router.get('/', async (req, resp) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .query('SELECT SUM(ConnectStat) AS usersOn FROM MEMB_STAT');

        resp.json(result.recordset);
    } catch (err) {
        resp.status(500).send(err.message);
    }
});

module.exports = router;
