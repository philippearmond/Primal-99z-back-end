const express = require('express');
const { poolPromise } = require('../../db');

const router = express.Router();

//ATENÇÃO!!!!!!!!!!!!!!!!!!!!!!!!!!!!! rota pegando o parametro da rota so funciona aqui!!!!!

/**
 * Get all coins of user (cash, gold, globin)
 */

router.get('/perfil/:id/moedas-info', async (req, resp) => {
    try {
        const { id } = req.params;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .query(`SELECT * FROM CashShopData WHERE AccountID = '${id}'`);

        resp.json(result.recordset);
    } catch (err) {
        resp.status(500).send(err.message);
    }
});

module.exports = router;
