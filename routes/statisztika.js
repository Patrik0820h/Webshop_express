import express from 'express'
import pool from '../db.js'

const router = express.Router()

router.get('/havi', async (req, res) => {
    let sql = "SELECT DATE_FORMAT(r.datum, '%Y-%m') as honap, COUNT(DISTINCT r.id) AS rendelesDb, SUM(t.db*t.egysegar) as bevetel FROM rendelesek r LEFT JOIN tetelek t ON r.id = t.rendeles_id WHERE r.statusz != 'törölve' GROUP BY DATE_FORMAT(r.datum, '%Y-%m') ORDER BY honap"

    let [rows] = await pool.query(sql)
    return res.json(rows)
})

router.get('/top-termekek', async (req,res) => {
    let n = Number(req.query.n)

    if (!Number.isInteger(n) || n <= 0){
        return res.status(400).send("Hibas szam.")
    }

    let sql = "SELECT t.nev, SUM(te.db) as eladottDB, SUM(te.db*te.egysegar) as bevetel FROM termekek t LEFT JOIN tetelek te ON t.id = te.termek_id LEFT JOIN rendelesek r ON te.rendeles_id = r.id WHERE r.statusz != 'törölve' GROUP BY t.id, t.nev ORDER BY eladottDB DESC LIMIT ?"
    let [rows] = await pool.query(sql, [n])
    return res.json(rows)
})

router.get('/kategoriak', async (req, res) => {
    let sql = "SELECT t.kategoria as kategoria, SUM(te.db) as eladottDB, SUM(te.db*te.egysegar) as bevetel FROM termekek t LEFT JOIN tetelek te ON t.id = te.termek_id LEFT JOIN rendelesek r ON te.rendeles_id = r.id WHERE r.statusz != 'törölve' GROUP BY t.kategoria"

    let [rows] = await pool.query(sql)
    return res.json(rows)
})

export default router;
