import React, { useState, useEffect } from 'react';
import ModalStyle from '../Styles/ModalIntegrante.module.css';

const EstudianteDeGradoModal = ({ isOpen, onClose, materialData, isEdit, onSubmit }) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipo, setTipo] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [url, setUrl] = useState('');
    const [archivoNombre, setArchivoNombre] = useState('');

    useEffect(() => {
        if (isEdit && materialData) {
            setTitulo(materialData.titulo);
            setDescripcion(materialData.descripcion);
            setTipo(materialData.tipo);

            if (materialData.archivo) {
                setArchivo(materialData.archivo);
                setArchivoNombre(materialData.archivo?.name || '');  // Aquí aseguramos que sea un string
            } else {
                setArchivo(null);
                setArchivoNombre('');
            }
            setUrl(materialData.url || '');
        } else {
            setTitulo('');
            setDescripcion('');
            setTipo('');
            setArchivo(null);
            setArchivoNombre('');
            setUrl('');
        }
    }, [isEdit, materialData, isOpen]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setArchivo(file);
        setArchivoNombre(file ? file.name : '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('tipo', tipo);
        if (archivo) {
            formData.append('archivo', archivo);
        }
        if (tipo === 'Video' && url) {
            formData.append('url', url);
        }

        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={ModalStyle.modalOverlay}>
            <div className={ModalStyle.modalContent}>
                <button type="button" onClick={onClose}>&times;</button>
                <h2>{isEdit ? 'Editar material' : 'Agregar material'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder='Título'
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder='Descripción'
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
      
                    {!isEdit ? (
                        <>
                            <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                                <option value="">Tipo de archivo</option>
                                <option value="Video">Video</option>
                                <option value="Documento">Documento</option>
                                <option value="Imagen">Imagen</option>
                            </select>
                            {tipo === 'Video' && (
                                <>
                                    <p style={{ marginBottom: 0 }}>Puede cargar un video mediante URL o mediante archivo</p>
                                    <input
                                        type="url"
                                        placeholder="URL del video"
                                        value={url}
                                        onChange={(e) => {
                                            setUrl(e.target.value);
                                            setArchivo(null);
                                            setArchivoNombre('');
                                        }}
                                    />
                                </>
                            )}
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept={tipo === 'Video' ? 'video/*' : tipo === 'Documento' ? 'application/*' : 'image/*'}
                            />
                        </>
                    ) : (
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)} disabled>
                            <option value="">Tipo de archivo</option>
                            <option value="Video">Video</option>
                            <option value="Documento">Documento</option>
                            <option value="Imagen">Imagen</option>
                        </select>
                    )}

                    <button type="submit">{isEdit ? 'Editar material' : 'Agregar material'}</button>
                </form>
            </div>
        </div>
    );
};

export default EstudianteDeGradoModal;

