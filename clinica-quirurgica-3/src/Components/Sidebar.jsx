// Sidebar.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faStethoscope, faBook, faInfoCircle, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import AdminPanelStyle from '../Styles/AdminPanel.module.css';
import { logout } from '../api/administracion-api';

const Sidebar = ({ setActiveTable }) => (
  <aside className={AdminPanelStyle.sidebar}>
    <ul>
      <li onClick={() => setActiveTable('Estudiantes')}>
        <FontAwesomeIcon icon={faBook} className={AdminPanelStyle.customPadding}/> Estudiantes de grado
      </li>
      <li onClick={() => setActiveTable('Postgrado')}>
        <FontAwesomeIcon icon={faStethoscope} className={AdminPanelStyle.customPadding}/> Postgrado
      </li>
      <li onClick={() => setActiveTable('Info Pacientes')}>
        <FontAwesomeIcon icon={faInfoCircle} className={AdminPanelStyle.customPadding}/> Info para Pacientes
      </li>
      <li onClick={() => setActiveTable('Equipo')}>
        <FontAwesomeIcon icon={faUsers} /> Equipo
      </li>
      <li onClick={() => setActiveTable('Biblioteca')}>
        <FontAwesomeIcon icon={faBook} className={AdminPanelStyle.customPadding}/> Biblioteca
      </li>
      <li onClick={() => setActiveTable('Administracion')}>
        <FontAwesomeIcon icon={faUsers} /> Administración
      </li>
      <li onClick={() => setActiveTable('Mi cuenta')}>
        <FontAwesomeIcon icon={faUser} className={AdminPanelStyle.customPadding}/> Mi cuenta
      </li>
      <li onClick={logout}>
        <FontAwesomeIcon icon={faRightFromBracket} className={AdminPanelStyle.customPadding}/> Cerrar sesión
      </li>
    </ul>
  </aside>
);

export default Sidebar;
