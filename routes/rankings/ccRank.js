const express = require('express');
const { poolPromise } = require('../../db');

const router = express.Router();

/**
 * Get cc rank info
 */

router.get('/', async (req, resp) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .query('SELECT Name, Score_semanal FROM RankingChaosCastle');

        resp.json(result.recordset);
    } catch (err) {
        resp.status(500).send(err.message);
    }
});

module.exports = router;
