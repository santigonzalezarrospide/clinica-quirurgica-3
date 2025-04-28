// HomeBody.js
import React, { forwardRef } from 'react';
import HomeBodyStyle from '../Styles/HomeBody.module.css';

const HomeBody = forwardRef((props, ref) => (
  <div ref={ref} className={HomeBodyStyle.HomeBody}>
    <div className={HomeBodyStyle.card}>
      <h2>Misión</h2>
      <h4>
        Brindar atención médica de alta calidad a los usuarios mediante acciones de promoción, prevención, recuperación y rehabilitación de la salud de las personas en forma integral física, psíquica y socialmente, integrando armónicamente actividades de asistencia, docencia e investigación.
      </h4>
    </div>

    <div className={HomeBodyStyle.card}>
      <h2>Visión</h2>
      <h4>
        Ser una organización reconocida a nivel nacional por brindar servicios de excelencia, cumpliendo los más estrictos estándares de calidad y seguridad, a través de una atención centrada en el usuario, eficaz y eficiente, mediante la descentralización de la atención, promoviendo el compromiso y la formación continua de sus funcionarios, procurando estar a la vanguardia del desarrollo tecnológico e integrando la docencia e investigación en beneficio de la salud pública.
      </h4>
    </div>

    <div className={HomeBodyStyle.card}>
      <h2>Valores</h2>
      <h4>
        La Clínica Quirúrgica 3 adhiere a los valores institucionales del Hospital Maciel, que incluyen:
        <br />
        <br />
        <li>
          Confianza, respeto mutuo y dignidad, siendo el paciente el centro de referencia y actuación de la organización.
        </li>

        <li>
          Vocación, compromiso, trabajo en equipo y sentido de pertenencia.
        </li>
        <li>
          Experiencia, conocimientos científicos y tecnológicos de todo el equipo asistencial.
        </li>
        <li>
          Afán de superación constante.
        </li>
        <li>
          Brindar una atención de calidad a lo largo de todo el proceso asistencial.
        </li>
      </h4>
    </div>
  </div>
));

export default HomeBody;
