// pages/api/get_dashboard_data.js
import pool from './db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM dashboard_data');
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los datos del dashboard.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
