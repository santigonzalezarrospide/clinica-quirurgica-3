import React from 'react';
import MaterialesStyle from '../Styles/CardMateriales.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faVideo, faImage, faPlay, faDownload} from '@fortawesome/free-solid-svg-icons';

const CardMateriales = ({ tipo = 'Documento', titulo, descripcion }) => {
    const getButtonText = () => {
        switch (tipo) {
            case 'Video':
                return 'Ver Video';
            case 'Image':
                return 'Ver Imagen';
            default:
                return 'Descargar';
        }
    };
    
    const getButtonIcon = () => {
        switch (tipo) {
            case 'Video':
                return <FontAwesomeIcon icon={faPlay} />;
            case 'Image':
                return <FontAwesomeIcon icon={faImage} />;
            default:
                return <FontAwesomeIcon icon={faDownload} />;
        }
    };
    const getIcon = () => {
        switch (tipo) {
            case 'Video':
                return <FontAwesomeIcon icon={faVideo} />;
            case 'Image':
                return <FontAwesomeIcon icon={faImage} />;
            default:
                return <FontAwesomeIcon icon={faFile} />;
        }
    };

    return (
        <div className={MaterialesStyle.cardMateriales}>
            <div className={MaterialesStyle.cardHeader}>
                <span className={MaterialesStyle.cardIcon}>{getIcon()}</span>
                <span className={MaterialesStyle.cardTitle}>{titulo}</span>
            </div>
            <div className={MaterialesStyle.cardBody}>
                <p className={MaterialesStyle.cardDescription}>{descripcion}</p>
            </div>
            <div className={MaterialesStyle.cardFooter}>
                <button className={MaterialesStyle.cardButton}>
                    <span className={MaterialesStyle.buttonIcon}>{getButtonIcon()}</span> {getButtonText()}
                </button>
            </div>
        </div>
    );
};

export default CardMateriales;
