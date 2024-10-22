import React from 'react'
import CardStyle from '../Styles/CardEquipo.module.css';

const CardEquipo = ({ image, name, specialty, description }) => {
    return (
        <div className={CardStyle.profileCard}>
            <div className={CardStyle.profileImage}>
                <img src={image} alt={`${name}`} />
            </div>
            <div className={CardStyle.profileInfo}>
                <h2>{name}</h2>
                <h4 className={CardStyle.specialty}>{specialty}</h4>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default CardEquipo