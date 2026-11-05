import express from 'express'
import pool from '../db.js'

const router = express.Router();

router.get('/', async (req,res) => {
    let statusz = req.query.statusz
    let tol = req.query.tol
    let ig = req.query.ig

    if (statusz) {
        let sql = "SELECT * FROM rendelesek WHERE statusz = ?"

        let [rows] = await pool.query(sql, [statusz])
        return res.json(rows)

    }

    if (tol && ig) {
        if (isNaN(Date.parse(tol)) || isNaN(Date.parse(ig))) 
        {
            return res.status(400).send("Hibas datum formatum.")
        }

        let sql = "SELECT * FROM rendelesek WHERE datum BETWEEN ? AND ?"

        let [rows] = await pool.query(sql, [tol, ig])
        return res.json(rows)
    }

    let sql = "SELECT r.id, DATE_FORMAT(r.datum, '%Y-%m-%d') as datum, r.statusz, v.nev AS vasarlo, SUM(t.db) as db, SUM(t.db*t.egysegar) as vegosszeg FROM rendelesek r LEFT JOIN vasarlok v ON r.vasarlo_id = v.id LEFT JOIN tetelek t on r.id = t.rendeles_id GROUP BY r.id, r.datum, r.statusz, v.nev ORDER BY r.datum"

    let [rows] = await pool.query(sql)
    return res.json(rows)    

    
})

router.get('/:id', async (req, res) => {
    let id = Number(req.params.id)

    if (!Number.isInteger(id)){
        return res.status(400).send("Hibas id.")
    }

    let sql = "SELECT * FROM rendelesek WHERE id = ?"

    let [rows] = await pool.query(sql, [id])

    if (rows.length == 0) {
        return res.status(404).send("A rendeles nem talalhato.")
    }
    return res.json(rows)
})

export default router;