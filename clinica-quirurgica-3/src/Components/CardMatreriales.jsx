import React, { useState } from 'react';
import MaterialesStyle from '../Styles/CardMateriales.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faVideo, faImage, faPlay, faDownload } from '@fortawesome/free-solid-svg-icons';

const CardMateriales = ({ tipo = 'Documento', titulo, descripcion, imagenSrc, archivo }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getButtonText = () => {
        switch (tipo) {
            case 'Video':
                return 'Ver Video';
            case 'Imagen':
                return 'Ver Imagen';
            default:
                return 'Descargar';
        }
    };

    const getButtonIcon = () => {
        switch (tipo) {
            case 'Video':
                return <FontAwesomeIcon icon={faPlay} />;
            case 'Imagen':
                return <FontAwesomeIcon icon={faImage} />;
            default:
                return <FontAwesomeIcon icon={faDownload} />;
        }
    };

    const getIcon = () => {
        switch (tipo) {
            case 'Video':
                return <FontAwesomeIcon icon={faVideo} />;
            case 'Imagen':
                return <FontAwesomeIcon icon={faImage} />;
            default:
                return <FontAwesomeIcon icon={faFile} />;
        }
    };

    const getImageSrc = () => {
        if (imagenSrc) {
            return imagenSrc;
        } else if (archivo && archivo.data) {
            // Convertir Buffer a una URL base64
            const base64String = btoa(
                new Uint8Array(archivo.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            return `data:image/png;base64,${base64String}`;
        }
        return null;
    };

    const handleButtonClick = () => {
        if (tipo === 'Imagen') {
            setIsModalOpen(true);
        } else if (tipo === 'Documento' && archivo) {
            // Determinar el tipo MIME
            let mimeType = archivo.mimeType || 'application/octet-stream'; // Valor predeterminado
    
            // Verificar si el archivo es un PDF basándonos en el contenido
            if (archivo.data && archivo.data[0] === 37 && archivo.data[1] === 80 && archivo.data[2] === 68) {
                mimeType = 'application/pdf';  // Asegurarse que se maneje como PDF
            }
    
            const blob = new Blob([new Uint8Array(archivo.data)], { type: mimeType });
            const url = URL.createObjectURL(blob);

            const extension = mimeType.split('/')[1] || 'bin';
            const filename = archivo.nombre || `${titulo}.${extension}`;
    
            const a = document.createElement('a');
            a.href = url;
            a.download = filename; // Asigna el nombre con la extensión adecuada
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
    
            // Liberar la URL después de usarla
            URL.revokeObjectURL(url);
        } else {
            console.log('Acción no soportada para tipo:', tipo);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const renderBodyContent = () => {
        if (tipo === 'Imagen') {
            const src = getImageSrc();
            if (src) {
                return <img src={src} alt={titulo} className={MaterialesStyle.cardImage} />;
            }
            return <p className={MaterialesStyle.cardDescription}>Imagen no disponible</p>;
        }
        return <p className={MaterialesStyle.cardDescription}>{descripcion}</p>;
    };

    return (
        <div className={MaterialesStyle.cardMateriales}>
            <div className={MaterialesStyle.cardHeader}>
                <span className={MaterialesStyle.cardIcon}>{getIcon()}</span>
                <span className={MaterialesStyle.cardTitle}>{titulo}</span>
            </div>
            <div className={MaterialesStyle.cardBody}>
                {renderBodyContent()}
            </div>
            <div className={MaterialesStyle.cardFooter}>
                <button className={MaterialesStyle.cardButton} onClick={handleButtonClick}>
                    <span className={MaterialesStyle.buttonIcon}>{getButtonIcon()}</span> {getButtonText()}
                </button>
            </div>

            {isModalOpen && (
                <div className={MaterialesStyle.modalOverlay} onClick={closeModal}>
                    <div className={MaterialesStyle.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={MaterialesStyle.closeButton} onClick={closeModal}>X</button>
                        <img src={getImageSrc()} alt={titulo} className={MaterialesStyle.modalImage} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardMateriales;
