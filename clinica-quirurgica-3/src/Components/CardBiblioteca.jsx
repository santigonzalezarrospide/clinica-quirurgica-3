import React from 'react';
import styles from '../Styles/CardBiblioteca.module.css';

const CardBiblioteca = ({ title, description, date, autor }) => {
    
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString('es-ES', options);
    };
    
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
                <p className={styles.date}>Publicado el: {formatDate(date)}</p>
                <p className={styles.date}>Autor: {autor}</p>
            </div>
            <button className={styles.downloadButton}>Descargar</button>
        </div>
    );
};

export default CardBiblioteca;