const express = require('express');
const { poolPromise } = require('../db');

const router = express.Router();

/**
 * Get lost password
 */

router.get('/', async (req, resp) => {
    try {
        const mock = 'louismk';

        const pool = await poolPromise;
        const result = await pool
            .request()
            .query(
                `SELECT memb___id, memb__pwd FROM MEMB_INFO WHERE memb___id = '${mock}'`
            );

        resp.json(result.recordset);
    } catch (err) {
        resp.status(500).send(err.message);
    }
});

module.exports = router;
