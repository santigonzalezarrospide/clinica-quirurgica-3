import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../Components/CardEquipo';
import EquipoStyle from '../Styles/Equipo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getIntegrantes } from '../api/integrantes-api';

const Equipo = () => {
    const navigate = useNavigate();
    const [integrantes, setIntegrantes] = useState([]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const fetchIntegrantes = async () => {
        try {
            const response = await getIntegrantes();
            setIntegrantes(response.data);
        } catch (error) {
            console.error("Error al obtener los integrantes:", error);
        }
    };

    useEffect(() => {
        fetchIntegrantes();
    }, []);

    return (
        <div>
            <h2 className={EquipoStyle.h2}>Nuestro Equípo Médico</h2>
            <div className={EquipoStyle.cardsContainer}>
                {integrantes.map((integrante) => (
                    <ProfileCard
                        key={integrante.id}
                        image={integrante.imagen} 
                        name={integrante.nombre}
                        specialty={integrante.especialidad}
                        description={integrante.descripcion}
                    />
                ))}
            </div>

            <div className={EquipoStyle.buttonContainer}>
                <button className={EquipoStyle.buttonBack} onClick={handleBackClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Volver
                </button>
            </div>
        </div>
    );
}

export default Equipo;
