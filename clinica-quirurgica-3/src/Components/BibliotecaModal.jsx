import React, { useState, useEffect } from 'react';
import ModalStyle from '../Styles/ModalIntegrante.module.css';

const BibliotecaModal = ({ isOpen, onClose, libroData, isEdit, onSubmit }) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [autor, setAutor] = useState('');
    const [fecha, setFecha] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [archivoNombre, setArchivoNombre] = useState('');

    useEffect(() => {
        if (isEdit && libroData) {
            setTitulo(libroData.titulo);
            setDescripcion(libroData.descripcion);
            setAutor(libroData.autor);
            setFecha(libroData.anioPublicacion);

            if (libroData.archivo) {
                setArchivo(libroData.archivo);
                setArchivoNombre(libroData.archivo?.name || '');
            } else {
                setArchivo(null);
                setArchivoNombre('');
            }
        } else {
            setTitulo('');
            setDescripcion('');
            setAutor('');
            setFecha('');
            setArchivo(null);
            setArchivoNombre('');
        }
    }, [isEdit, libroData, isOpen]);

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
        formData.append('autor', autor);
        formData.append('anioPublicacion', fecha);
        if (archivo) {
            formData.append('archivo', archivo);
        }

        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={ModalStyle.modalOverlay}>
            <div className={ModalStyle.modalContent}>
                <button type="button" onClick={onClose}>&times;</button>
                <h2>{isEdit ? 'Editar publicación' : 'Agregar publicación'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder='Título'
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder='Autor'
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        placeholder='Fecha de publicación'
                        value={fecha ? new Date(fecha).toISOString().split('T')[0] : ''}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder='Descripción'
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />

                    {!isEdit ?
                        <input
                            type="file"
                            onChange={handleFileChange}
                            required />
                        :
                        ""
                    }

                    <button type="submit">{isEdit ? 'Editar publicación' : 'Agregar publicación'}</button>
                </form>
            </div>
        </div>
    );
};

export default BibliotecaModal;

