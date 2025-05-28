// pages/reports.js
import { useEffect, useState } from 'react';
import styles from '../styles/Reports.module.css';

export default function Reports() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/get_reports');
      const result = await response.json();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Registro de Consumos</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="table-responsive">
          <table id="tabla" className="table table-striped table-bordered table-hover mb-0 display" width="100%">
            <thead>
              <tr>
                <th>id</th>
                <th>Fecha</th>
                <th>Combustible</th>
                <th>Gerencia de Suministro</th>
                <th>Punto de Suministro</th>
                <th>Transporte y/o Equipo</th>
                <th>Tipo de Unidad</th>
                <th>Flota</th>
                <th>Clase de Unidad</th>
                <th>Actividad Asociada</th>
                <th>Unidad Operativa</th>
                <th>Organización del Usuario</th>
                <th>Organización que Autoriza</th>
                <th>Nombre</th>
                <th>Cédula</th>
                <th>Kilómetros</th>
                <th>Litros</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.fecha_rec}</td>
                  <td>{item.combustible}</td>
                  <td>{item.gciaSuministro}</td>
                  <td>{item.ptoSuministro}</td>
                  <td>{item.transpEquipo}</td>
                  <td>{item.tipoUnid}</td>
                  <td>{item.flota}</td>
                  <td>{item.clasUnidad}</td>
                  <td>{item.actAsoc}</td>
                  <td>{item.unidOpera}</td>
                  <td>{item.orgUsuario}</td>
                  <td>{item.orgAutoriza}</td>
                  <td>{item.nombre}</td>
                  <td>{item.cedula}</td>
                  <td>{item.kilometros}</td>
                  <td>{item.litros}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
