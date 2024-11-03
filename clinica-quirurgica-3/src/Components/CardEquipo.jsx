import React from 'react'
import CardStyle from '../Styles/CardEquipo.module.css';

const CardEquipo = ({ image, name,apellido, specialty, description }) => {
    return (
        <div className={CardStyle.profileCard}>
            <div className={CardStyle.profileImage}>
                {image ? (
                    <img src={image} alt={`${name}`} />
                ) : (
                    <img src="/img/user.png" alt="Imagen por defecto" />
                )}
            </div>
            <div className={CardStyle.profileInfo}>
                <h2>{name} {apellido} </h2>
                <h4 className={CardStyle.specialty}>{specialty}</h4>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default CardEquipo;
