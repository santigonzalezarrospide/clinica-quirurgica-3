import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import IntegranteTable from '../Components/IntegranteTable';
import AdminPanelStyle from '../Styles/AdminPanel.module.css';
import Administracion from '../Components/Administracion';
import MiCuenta from '../Components/MiCuenta';
import Biblioteca from '../Components/Biblioteca';
import EstudiantesDeGrado from '../Components/EstudiantesDeGrado';
import Postgrado from '../Components/Postgrado';
import InfoPacientes from '../Components/InfoPacientes';

const AdminPanel = () => {
  const [activeTable, setActiveTable] = useState('Estudiantes');
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  const renderActiveTable = () => {
    switch (activeTable) {
      case 'Estudiantes':
        return <EstudiantesDeGrado />;
      case 'Postgrado':
        return <Postgrado />;
      case 'Info Pacientes':
        return <InfoPacientes />;
      case 'Equipo':
        return <IntegranteTable />;
      case 'Biblioteca':
        return <Biblioteca />;
      case 'Administracion':
        return <Administracion />;
      case 'Mi cuenta':
        return <MiCuenta />;
      default:
        return null;
    }
  };

  if (isLoading) return null;

  return (
    <div className={AdminPanelStyle.adminPanel}>
      <Sidebar setActiveTable={setActiveTable} />
      {renderActiveTable()}
    </div>
  );
};

export default AdminPanel;
