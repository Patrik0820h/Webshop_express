import express from 'express'
import pool from '../db.js'

const router = express.Router()

router.get('/sosem-rendelt', async (req,res) => {
    let sql = "SELECT * FROM termekek t WHERE NOT EXISTS (SELECT * FROM tetelek te WHERE te.termek_id = t.id)"

    let [rows] = await pool.query(sql)
    return res.json(rows)
})

export default router;