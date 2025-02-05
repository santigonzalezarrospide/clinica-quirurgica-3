import React, { useState, useEffect } from 'react';
import AdminPanelStyle from '../Styles/AdminPanel.module.css';
import { getBiblioteca, createLibro, updateLibro, deleteLibro, getLibroById } from '../api/biblioteca-api';
import ConfirmPopupStyle from '../Styles/Alert.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BibliotecaModal from './BibliotecaModal';

const Biblioteca = () => {
    const [biblioteca, setBiblioteca] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedLibro, setSelectedLibro] = useState(null);

    useEffect(() => {
        fetchBiblioteca();
    }, []);

    const fetchBiblioteca = async () => {
        try {
            const response = await getBiblioteca();
            console.log(response.data);
            setBiblioteca(response.data);
        } catch (error) {
            toast.error("Error al obtener la boblioteca");
        }
    };

    const handleCreateClick = () => {
        setIsEdit(false);
        setSelectedLibro(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (libro) => {
        setIsEdit(true);
        setSelectedLibro(libro);
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (libroData) => {
        try {
            if (isEdit) {
                await updateLibro(selectedLibro.id, libroData);
                toast.success("Publicación editada exitosamente");
            } else {
                await createLibro(libroData);
                toast.success("Publicación creada exitosamente");
            }
            setIsModalOpen(false);
            fetchBiblioteca();
        } catch (error) {
            toast.error("Error al guardar la publicación");
        }
    };

    const handleDeleteClick = (libro) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={ConfirmPopupStyle.popupContainer}>
                        <h1 className={ConfirmPopupStyle.popupTitle}>Eliminar Publicación</h1>
                        <p className={ConfirmPopupStyle.popupMessage}>
                            ¿Estás seguro de que deseas eliminar {libro.titulo}?
                        </p>
                        <div className={ConfirmPopupStyle.popupButtonGroup}>
                            <button
                                className={ConfirmPopupStyle.confirmButton}
                                onClick={async () => {
                                    try {
                                        await deleteLibro(libro.id);
                                        toast.success("Publicación eliminada exitosamente");
                                        fetchBiblioteca();
                                        onClose();
                                    } catch (error) {
                                        toast.error("Error al eliminar la publicación");
                                    }
                                }}
                            >
                                Sí
                            </button>
                            <button className={ConfirmPopupStyle.cancelButton} onClick={onClose}>
                                No
                            </button>
                        </div>
                    </div>
                );
            }
        });
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString('es-ES', options);
    };

    return (
        <main className={AdminPanelStyle.mainContent}>
            <div className={AdminPanelStyle.panelHeader}>
                <h1>Biblioteca</h1>
                <button className={AdminPanelStyle.addButton} onClick={handleCreateClick}>
                    Agregar publicación
                </button>
            </div>

            <div className={AdminPanelStyle.adminTableContainer}>
                <table className={AdminPanelStyle.adminTable}>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Autor</th>
                            <th>Fecha de publicación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {biblioteca.map((biblio) => (
                            <tr key={biblio.id}>
                                <td>{biblio.titulo}</td>
                                <td>{biblio.autor}</td>
                                <td>{formatDate(biblio.anioPublicacion)}</td>
                                <td>
                                    <button className={AdminPanelStyle.actionButton} onClick={() => handleEditClick(biblio)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className={AdminPanelStyle.actionButton} onClick={() => handleDeleteClick(biblio)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <BibliotecaModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                libroData={selectedLibro}
                isEdit={isEdit}
                onSubmit={handleModalSubmit}
            />

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

        </main>
    );
};

export default Biblioteca