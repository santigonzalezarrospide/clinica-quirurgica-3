import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import IntegranteTable from '../Components/IntegranteTable';
import AdminPanelStyle from '../Styles/AdminPanel.module.css';
import Administracion from '../Components/Administracion';
import MiCuenta from '../Components/MiCuenta';

const AdminPanel = () => {
  const [activeTable, setActiveTable] = useState('Equipo');
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirige a la página de inicio de sesión si no hay token
    } else {
      setIsLoading(false); // Deja de cargar solo si el token es válido
    }
  }, [navigate]);

  const renderActiveTable = () => {
    switch (activeTable) {
      case 'Equipo':
        return <IntegranteTable />;
      case 'Administracion':
        return <Administracion />;
      case 'Mi cuenta':
        return <MiCuenta />;
      default:
        return null;
    }
  };

  // Renderiza solo cuando isLoading es false (es decir, después de la verificación del token)
  if (isLoading) return null;

  return (
    <div className={AdminPanelStyle.adminPanel}>
      <Sidebar setActiveTable={setActiveTable} />
      {renderActiveTable()}
    </div>
  );
};

export default AdminPanel;
