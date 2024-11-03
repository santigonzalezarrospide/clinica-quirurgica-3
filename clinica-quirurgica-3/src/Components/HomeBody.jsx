// HomeBody.js
import React, { forwardRef } from 'react';
import HomeBodyStyle from '../Styles/HomeBody.module.css';

const HomeBody = forwardRef((props, ref) => (
  <div ref={ref} className={HomeBodyStyle.HomeBody}>
    <div className={HomeBodyStyle.card}>
      <h2>Misión</h2>
      <p>
        Proporcionar atención quirúrgica de la más alta calidad, centrada en el paciente,
        a través de la innovación, la investigación y la excelencia en la práctica médica.
      </p>
    </div>

    <div className={HomeBodyStyle.card}>
      <h2>Visión</h2>
      <p>
        Ser reconocidos como líderes en cirugía a nivel nacional e internacional,
        formando a las próximas generaciones de cirujanos y mejorando constantemente
        los resultados para nuestros pacientes.
      </p>
    </div>

    <div className={HomeBodyStyle.card}>
      <h2>Valores</h2>
      <ul>
        <li>Excelencia</li>
        <li>Integridad</li>
        <li>Compasión</li>
        <li>Innovación</li>
        <li>Trabajo en equipo</li>
      </ul>
    </div>
  </div>
));

export default HomeBody;
