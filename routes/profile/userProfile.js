const express = require('express');
const { poolPromise } = require('../../db');

const router = express.Router();

/**
 * User characters profile
 */

router.get('/perfil/:id', async (req, resp) => {
    try {
        const { id } = req.params;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .query(
                `SELECT Name, Class, MDate, PkCount, Kills, Deads, ResetCount, MasterResetCount, memb_name, mail_addr, bloc_code, AccountLevel, AccountExpireDate FROM Character JOIN MEMB_INFO on Character.AccountID = memb___id WHERE AccountID = '${id}'`
            );

        resp.json(result.recordset);
    } catch (err) {
        resp.status(500).send(err.message);
    }
});

module.exports = router;
