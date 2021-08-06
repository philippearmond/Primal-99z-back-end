const express = require('express');
const { poolPromise } = require('../../db');

const router = express.Router();

/**
 * History of coins transactions
 */

router.get('/perfil/:id/transacoes', async (req, resp) => {
    try {
        const { id } = req.params;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .query(
                `SELECT valor, data, ip, tipo FROM LOG_CREDITOS WHERE Login = '${id}'`
            );

        resp.json(result.recordset);
    } catch (err) {
        resp.status(500).send(err.message);
    }
});

module.exports = router;
