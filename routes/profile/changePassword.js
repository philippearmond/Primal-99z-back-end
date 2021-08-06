const express = require('express');
const { poolPromise } = require('../../db');

const router = express.Router();

/**
 * Change password
 */

router.put('/', async (req, resp) => {
    const { login, password, newPassword } = req.body;

    const pool = await poolPromise;

    try {
        const getResult = await pool
            .request()
            .query(
                `SELECT memb___id FROM MEMB_INFO WHERE '${login}' = memb___id AND '${password}' = memb__pwd`
            );

        if (!getResult.recordset.length)
            return resp.status(500).send('Usuário ou senha incorreto');

        const putResult = await pool
            .request()
            .query(
                `UPDATE MEMB_INFO SET memb__pwd = '${newPassword}' WHERE '${login}' = memb___id`
            );

        resp.json(putResult.recordset);
    } catch (err) {
        resp.status(500).send(err.message);
    }
});

module.exports = router;
