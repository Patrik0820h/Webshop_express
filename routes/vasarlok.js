import express from 'express'
import pool from '../db.js'

const router = express.Router();

router.get('/:id/rendelesek', async (req,res) => {
    let id = Number(req.params.id)

    if (!Number.isInteger(id)) {
        return res.status(400).send("Hibas id.")
    }  

    let sql = "SELECT * FROM rendelesek WHERE vasarlo_id = ?"
    let [rows] = await pool.query(sql, [id])

    if (rows.length == 0) {
        return res.status(404).send("A vasarlo nem talalhato.")
    }

    return res.json(rows)

})


export default router;