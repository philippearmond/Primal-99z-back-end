const express = require('express');
const { poolPromise } = require('../db');

const router = express.Router();

/**
 * User register
 */

router.post('/', async (req, resp) => {
    try {
        const {
            login,
            name,
            email,
            password,
            age,
            country,
            state,
            foundUs,
            foundUsSpecify,
        } = req.body;

        const pool = await poolPromise;
        const getResult = await pool
            .request()
            .query(
                `SELECT memb___id FROM MEMB_INFO WHERE memb___id = '${login}'`
            );

        if (getResult.recordset.length)
            return resp.status(500).send('Usuário já existe');

        const postResult = await pool
            .request()
            .query(
                `INSERT INTO MEMB_INFO (memb___id, memb__pwd, memb_name, sno__numb, addr_info, addr_deta, tel__numb, mail_addr, fpas_ques, fpas_answ, bloc_code, ctl1_code) VALUES ('${login}', '${password}', '${name}', 1, '${country}', '${state}', ${age}, '${email}', '${foundUs}', '${foundUsSpecify}', 0, 1)`
            );

        resp.json(postResult.recordset);
    } catch (err) {
        resp.status(500).send(err.message);
    }
});

module.exports = router;
