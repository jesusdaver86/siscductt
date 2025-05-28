// pages/verify.js
import { useState } from 'react';
import styles from '../styles/Verify.module.css';

export default function Verify() {
  const [ticket, setTicket] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  const handleVerify = async () => {
    setLoading(true);
    const response = await fetch('/api/check_ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unidOpera: ticket }),
    });

    const data = await response.json();
    setResult(data.message);
    if (response.ok) {
      setTicketData(data.data);
    } else {
      setTicketData(null);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/insert_ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className={styles.container}>
      <h5>TICKET</h5>
      <input
        type="text"
        placeholder="Ingrese el número de ticket"
        value={ticket}
        onChange={(e) => setTicket(e.target.value)}
        required
      />
      <button onClick={handleVerify} disabled={loading}>
        {loading ? 'Verificando...' : 'Verificar'}
      </button>
      <div id="result">{result}</div>

      {ticketData && (
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Form fields for ticketData */}
          <button type="submit">Registrar</button>
        </form>
      )}
    </div>
  );
}
