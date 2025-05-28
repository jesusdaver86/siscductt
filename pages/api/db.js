// pages/api/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'raida2028',
  database: 'listabd',
});

export default pool;
