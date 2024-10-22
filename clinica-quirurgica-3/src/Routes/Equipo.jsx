import React from 'react'
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../Components/CardEquipo';
import EquipoStyle from '../Styles/Equipo.module.css';
import usuario from '../utils/equipo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Equipo = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div>
            <h2 className={EquipoStyle.h2}>Nuestro Equípo Médico</h2>

            <div className={EquipoStyle.cardsContainer}>
                {usuario.map((user) => (
                    <ProfileCard
                        key={user.id}
                        image={user.image}
                        name={user.name}
                        specialty={user.specialty}
                        description={user.description}
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

    )
}

export default Equipo