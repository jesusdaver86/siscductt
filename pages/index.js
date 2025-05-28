// pages/index.js
import { useState, useEffect } from 'react';
import styles from '../styles/Dashboard.module.css';

export default function Index() {
  const [data, setData] = useState({
    registro: 0,
    regdiesel: 0,
    ltsgas: 0,
    ltsdie: 0,
    ultGas: 0,
    ultDie: 0,
    tokens: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/get_dashboard_data');
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <header>
        <nav className="rad-navigation">
          <div className="rad-logo-container rad-nav-min">
            <a href="#" className="rad-logo">
              <i className="">
                <span _ngcontent-cpl-c3="">
                  <div className="logo">
                    <img src="./assets/img/logo.svg" alt="" />
                  </div>
                </span>
              </i>
            </a>
            <a href="#" className="rad-toggle-btn pull-right">
              <i className="fa fa-bars"></i>
            </a>
          </div>
        </nav>
      </header>
      <aside>
        <nav className="rad-sidebar rad-nav-min">
          <ul>
            <li>
              <a href="./verify" referrerpolicy="no-referrer, strict-origin-when-cross-origin">
                <i className="fa fa-check-square">
                  <span className="icon-bg rad-bg-success"></span>
                </i>
                <span className="rad-sidebar-item">Verificación y Registro</span>
              </a>
            </li>
            <li>
              <a href="./reports" className="imbox" referrerpolicy="no-referrer, strict-origin-when-cross-origin">
                <i className="fa fa-chart-bar">
                  <span className="icon-bg rad-bg-danger"></span>
                </i>
                <span className="rad-sidebar-item">Reportes E/S</span>
              </a>
            </li>
            <li>
              <a href="./import" referrerpolicy="no-referrer, strict-origin-when-cross-origin">
                <i className="fa fa-upload">
                  <span className="icon-bg rad-bg-violet"></span>
                </i>
                <span className="rad-sidebar-item">Importación de datos</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main>
        <section>
          <div className="rad-body-wrapper rad-nav-min">
            <div className="container-fluid">
              <header className="rad-page-title">
                <span>Panel</span>
              </header>
              <div className="row">
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="card-gas-icon">
                        <i className="fa fa-fw fa-gas-pump"></i>
                      </div>
                      <span className="value" style={{ fontSize: '30px' }}>
                        Gasolina: <span id="registro">{data.registro}</span>
                      </span>
                      <span className="value" style={{ fontSize: '30px' }}>
                        Gasoil: <span id="regdiesel">{data.regdiesel}</span>
                      </span>
                      <br />
                      <span className="heading">Cantidad de Despachos</span>
                    </div>
                    <a className="card-footer text-white clearfix small z-1" href="./reports">
                      <span className="float-left">Ver Despachos</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="card-gas-icon">
                        <i className="fa fa-fw fa-gas-pump"></i>
                      </div>
                      <span className="value" style={{ fontSize: '30px' }}>
                        Gasolina: <span id="ltsgas">{data.ltsgas}</span>
                      </span>
                      <span className="value" style={{ fontSize: '30px' }}>
                        Gasoil: <span id="ltsdie">{data.ltsdie}</span>
                      </span>
                      <br />
                      <span className="heading">Volumen Despachado</span>
                    </div>
                    <a className="card-footer text-white clearfix small z-1" href="./reports">
                      <span className="float-left">Ver Totales</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="card-gas-icon">
                        <i className="fa fa-fw fa-gas-pump"></i>
                      </div>
                      <span className="value" style={{ fontSize: '30px' }}>
                        Gasolina: <span id="ultGas">{data.ultGas}</span>
                      </span>
                      <span className="value" style={{ fontSize: '30px' }}>
                        Gasoil: <span id="ultDie">{data.ultDie}</span>
                      </span>
                      <br />
                      <span className="heading">Último Despacho</span>
                    </div>
                    <a className="card-footer text-white clearfix small z-1" href="./reports">
                      <span className="float-left">Ver Despachos</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-xs-6">
                  <div onClick={() => window.location.href = './import'} className="rad-info-box rad-txt-primary">
                    <i className="fa fa-pen-square"></i>
                    <span className="heading">Autorizados hoy!</span>
                    <span className="value">
                      <span id="tokens">{data.tokens}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
