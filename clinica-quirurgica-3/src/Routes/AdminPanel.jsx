// AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { getIntegrantes } from '../api/integrantes-api'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStethoscope, faBook, faInfoCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import AdminPanelStyle from '../Styles/AdminPanel.module.css';
import ModalCrearIntegrante from '../Components/ModalIntegrante';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [activeTable, setActiveTable] = useState('Equipo');
  const [integrantes, setIntegrantes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedIntegrante, setSelectedIntegrante] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoggedIn(false);
          navigate('/login');
          return;
        }
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error al verificar el login:", error);
        navigate('/login');
      }
    };

    checkLogin();

    if (activeTable === 'Equipo' && isLoggedIn) {
      fetchIntegrantes();
    }
  }, [activeTable, isLoggedIn, navigate]);

  const fetchIntegrantes = async () => {
    try {
      const response = await getIntegrantes();
      setIntegrantes(response.data);
    } catch (error) {
      console.error("Error al obtener los integrantes:", error);
    }
  };

  const handleCreateClick = () => {
    setIsEdit(false);
    setSelectedIntegrante(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (integrante) => {
    setIsEdit(true);
    setSelectedIntegrante(integrante);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (integranteId) => {
    console.log(`Eliminando integrante con ID: ${integranteId}`);
    fetchIntegrantes();
  };

  const handleSubmit = (integranteData) => {
    if (isEdit) {
      console.log("Actualizando integrante:", integranteData);
    } else {
      console.log("Creando nuevo integrante:", integranteData);
    }
    setIsModalOpen(false);
    fetchIntegrantes();
  };

  const renderTableContent = () => {
    switch (activeTable) {
      case 'Equipo':
        return (
          <tbody>
            {integrantes.map((integrante) => (
              <tr key={integrante.id}>
                <td>{integrante.nombre} {integrante.apellido}</td>
                <td>{integrante.especialidad}</td>
                <td>
                  <button
                    className={AdminPanelStyle.actionButton}
                    onClick={() => handleEditClick(integrante)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className={AdminPanelStyle.actionButton}
                    onClick={() => handleDeleteClick(integrante.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        );
      case 'Especialidades':
        return (
          <tbody>
            <tr>
              <td>Nombre de la Especialidad</td>
              <td>Descripción</td>
              <td>
                <button className={AdminPanelStyle.actionButton}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className={AdminPanelStyle.actionButton}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          </tbody>
        );
      case 'Material Didáctico':
        return (
          <tbody>
            <tr>
              <td>Nombre del Material</td>
              <td>Tipo</td>
              <td>
                <button className={AdminPanelStyle.actionButton}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className={AdminPanelStyle.actionButton}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          </tbody>
        );
      case 'Info para Pacientes':
        return (
          <tbody>
            <tr>
              <td>Nombre de la Info</td>
              <td>Detalles</td>
              <td>
                <button className={AdminPanelStyle.actionButton}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className={AdminPanelStyle.actionButton}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          </tbody>
        );
      default:
        return null;
    }
  };

  return (
    <div className={AdminPanelStyle.adminPanel}>
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

      <main className={AdminPanelStyle.mainContent}>
        <div className={AdminPanelStyle.panelHeader}>
          <h1>Panel de Administración</h1>
          <p>Gestiona el contenido de Clínica Quirúrgica 3</p>
          <button 
            className={AdminPanelStyle.addButton}
            onClick={handleCreateClick}
          >
            Crear integrante
          </button>
        </div>

        <div className={AdminPanelStyle.adminTableContainer}>
          <table className={AdminPanelStyle.adminTable}>
            <thead>
              <tr>
                <th>Nombre, Apellido</th>
                <th>
                  {activeTable === 'Equipo'
                    ? 'Especialidad'
                    : activeTable === 'Especialidades'
                    ? 'Descripción'
                    : activeTable === 'Material Didáctico'
                    ? 'Tipo'
                    : 'Detalles'}
                </th>
                <th>Acciones</th>
              </tr>
            </thead>
            {renderTableContent()}
          </table>
        </div>

        <ModalCrearIntegrante
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          integranteData={selectedIntegrante}
          isEdit={isEdit}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
};

export default AdminPanel;
