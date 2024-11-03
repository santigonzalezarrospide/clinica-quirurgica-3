// Sidebar.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStethoscope, faBook, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import AdminPanelStyle from '../Styles/AdminPanel.module.css';

const Sidebar = ({ setActiveTable }) => (
  <aside className={AdminPanelStyle.sidebar}>
    <ul>
      <li onClick={() => setActiveTable('Equipo')}>
        <FontAwesomeIcon icon={faUser} /> Equipo
      </li>
      <li onClick={() => setActiveTable('Especialidades')}>
        <FontAwesomeIcon icon={faStethoscope} /> Especialidades
      </li>
      <li onClick={() => setActiveTable('Material Didáctico')}>
        <FontAwesomeIcon icon={faBook} /> Material Didáctico
      </li>
      <li onClick={() => setActiveTable('Info para Pacientes')}>
        <FontAwesomeIcon icon={faInfoCircle} /> Info para Pacientes
      </li>
    </ul>
  </aside>
);

export default Sidebar;
