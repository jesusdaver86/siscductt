// pages/api/import_tickets.js
import pool from './db';
import formidable from 'formidable';
import { parse } from 'papaparse';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'Error al procesar el archivo.' });
      }

      const filePath = files.file[0].filepath;

      // Leer el archivo CSV
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const parsedData = parse(fileContent, { header: true }).data;

      try {
        for (const row of parsedData) {
          const {
            active,
            combustible,
            gciaSuministro,
            ptoSuministro,
            transpEquipo,
            tipoUnid,
            flota,
            clasUnidad,
            actAsoc,
            unidOpera,
            orgUsuario,
            nombre,
            cedula,
            litros,
            trans80,
            tipo,
            solofecha,
          } = row;

          const trans80Date = new Date(trans80).toISOString().split('T')[0];
          const solofechaDate = new Date(solofecha).toISOString().split('T')[0];

          await pool.query(
            "INSERT INTO tickets (active, combustible, gciaSuministro, ptoSuministro, transpEquipo, tipoUnid, flota, clasUnidad, actAsoc, unidOpera, orgUsuario, nombre, cedula, litros, trans80, tipo, solofecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [active, combustible, gciaSuministro, ptoSuministro, transpEquipo, tipoUnid, flota, clasUnidad, actAsoc, unidOpera, orgUsuario, nombre, cedula, litros, trans80Date, tipo, solofechaDate]
          );
        }

        res.status(200).json({ message: 'Datos importados correctamente.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al importar los datos.' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
