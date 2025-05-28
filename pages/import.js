// pages/import.js
import { useState } from 'react';
import styles from '../styles/Import.module.css';

export default function Import() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/import_tickets', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setResult(data.message);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>Gestión de Datos</h1>
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modalImportData">
        <i className="fa fa-upload"></i> Importar Datos
      </button>

      <div id="modalImportData" className="modal fade" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Importar Datos Masivos</h5>
              <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="modal-body">
                <div className="alert alert-info">
                  <i className="fa fa-circle-info"></i> Formato requerido:
                  <a href="../../assets/formato_importacion.xlsx" download className="text-decoration-none">
                    Descargar plantilla <i className="fa fa-download"></i>
                  </a>
                </div>
                <div className="mb-3">
                  <label className="form-label">Archivo a importar</label>
                  <input type="file" name="file" className="form-control" accept=".csv, .xls, .xlsx" onChange={handleFileChange} required />
                  <div className="form-text">Formatos permitidos: XLS, XLSX, CSV (Max. 5MB)</div>
                </div>
                {loading && <div className="progress"><div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '100%' }}>Cargando...</div></div>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="submit" className="btn btn-success">
                  <i className="fa fa-upload me-2"></i> Importar Lista
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div id="result">{result}</div>
    </div>
  );
}
