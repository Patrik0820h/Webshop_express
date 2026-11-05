import mysql from 'mysql2/promise'
import { dateToString } from 'sql-escaper';

const dbconfig = {
    host: 'localhost', 
    user: 'root',
    password: '',
    database: 'webshop',
    port: '3307',
    dateStrings: true
}

const pool = mysql.createPool(dbconfig);

export default pool;