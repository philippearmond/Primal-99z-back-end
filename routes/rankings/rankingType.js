const express = require('express');
const { poolPromise } = require('../../db');

const router = express.Router();

/**
 * Filter user rank by reset, masterReset or class
 */

router.get('/', async (req, resp) => {
    try {
        const { optSelected } = req.body;
        const pool = await poolPromise;

        if (
            optSelected === 'ResetCount' ||
            optSelected === 'MasterResetCount'
        ) {
            const result = await pool
                .request()
                .query(
                    `SELECT Name, ResetCount, MasterResetCount FROM Character ORDER BY ${optSelected} DESC`
                );

            return resp.json(result.recordset);
        }

        const rankingClassOptions = {
            bk: '17',
            sm: '1',
            elf: '33',
            dl: '64',
            mg: '48',
        };

        const result = await pool
            .request()
            .query(
                `SELECT NAME, ResetCount, MasterResetCount FROM Character WHERE Class = ${rankingClassOptions[optSelected]} ORDER BY MasterResetCount DESC`
            );

        resp.json(result.recordset);
    } catch (err) {
        resp.status(500).send(err.message);
    }
});

module.exports = router;
