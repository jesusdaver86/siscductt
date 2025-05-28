// pages/api/check_ticket.js
import pool from './db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { unidOpera } = req.body;
    const fechaActual = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

    try {
      // Verificar si el ticket es válido para la fecha actual
      const [result] = await pool.query(
        'SELECT * FROM tickets WHERE unidOpera = ? AND solofecha = ?',
        [unidOpera.toLowerCase(), fechaActual]
      );

      // Verificar si el ticket es válido pero no para la fecha actual
      const [resulta] = await pool.query(
        'SELECT * FROM tickets WHERE unidOpera = ? AND solofecha <> ? AND active = "1"',
        [unidOpera.toLowerCase(), fechaActual]
      );

      if (result.length > 0) {
        // Ticket válido para la fecha actual
        const ticketData = result[0];
        res.status(200).json({
          message: 'Ticket válido. Proceda a llenar el formulario.',
          data: ticketData,
        });
      } else if (resulta.length > 0) {
        // Ticket válido pero no para la fecha actual
        const ticketData = resulta[0];
        const tiempo = calcularTiempo(ticketData.fecha);
        res.status(200).json({
          message: 'Ya surtió!',
          data: ticketData,
          tiempo,
        });
      } else {
        res.status(400).json({ message: 'Oh no! No está en lista.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en la conexión a la base de datos.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Función para calcular el tiempo desde la fecha
function calcularTiempo(fecha) {
  const ahora = Math.floor(Date.now() / 1000);
  const fechaUnix = Math.floor(new Date(fecha).getTime() / 1000);
  const diferencia = Math.abs(ahora - fechaUnix);
  const intervalos = ["segundo", "minuto", "hora", "día", "semana", "mes", "año"];
  const duraciones = [60, 60, 24, 7, 4.35, 12];

  let j = 0;
  for (j = 0; diferencia >= duraciones[j] && j < duraciones.length - 1; j++) {
    diferencia /= duraciones[j];
  }

  diferencia = Math.round(diferencia);
  const tiempo = diferencia !== 1 ? `${diferencia} ${intervalos[j]}s` : `${diferencia} ${intervalos[j]}`;
  return tiempo;
}
