const express = require('express');
const { poolPromise } = require('../db');

const router = express.Router();

/**
 * Siege Info
 */

router.get('/', async (req, resp) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .query(
                'SELECT SIEGE_START_DATE, SIEGE_END_DATE, OWNER_GUILD, SIEGE_GUILDLIST_SETTED, SIEGE_ENDED FROM MuCastle_DATA'
            );
        resp.json(result.recordset);
    } catch (err) {
        resp.status(500).send(err.message);
    }
});

module.exports = router;
