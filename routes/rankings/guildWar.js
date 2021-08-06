const express = require('express');
const { poolPromise } = require('../../db');

const router = express.Router();

/**
 * Best guild war score
 */

router.get('/', async (req, resp) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .query('SELECT G_Name, G_Score FROM Guild ORDER BY G_Score DESC');

        resp.json(result.recordset);
    } catch (err) {
        resp.status(500).send(err.message);
    }
});

module.exports = router;
