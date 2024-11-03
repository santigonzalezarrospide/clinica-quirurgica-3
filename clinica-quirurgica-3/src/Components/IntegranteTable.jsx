import React, { useState, useEffect } from 'react';
import { getIntegrantes, createIntegrante, updateIntegrante, deleteIntegrante } from '../api/integrantes-api';
import AdminPanelStyle from '../Styles/AdminPanel.module.css';
import ConfirmPopupStyle from '../Styles/Alert.module.css';
import ModalCrearIntegrante from '../Components/ModalIntegrante';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const IntegranteTable = () => {
    const [integrantes, setIntegrantes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedIntegrante, setSelectedIntegrante] = useState(null);

    useEffect(() => {
        fetchIntegrantes();
    }, []);

    const fetchIntegrantes = async () => {
        try {
            const response = await getIntegrantes();
            setIntegrantes(response.data);
        } catch (error) {
            toast.error("Error al obtener los integrantes");
        }
    };

    const handleCreateClick = () => {
        setIsEdit(false);
        setSelectedIntegrante(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (integrante) => {
        setIsEdit(true);
        setSelectedIntegrante(integrante);
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (integranteData) => {
        try {
            if (isEdit) {
                await updateIntegrante(selectedIntegrante.id, integranteData);
                toast.success("Integrante editado exitosamente");
            } else {
                await createIntegrante(integranteData);
                toast.success("Integrante creado exitosamente");
            }
            setIsModalOpen(false);
            fetchIntegrantes();
        } catch (error) {
            toast.error("Error al guardar el integrante");
        }
    };

    const handleDeleteClick = (integrante) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={ConfirmPopupStyle.popupContainer}>
                        <h1 className={ConfirmPopupStyle.popupTitle}>Eliminar Integrante</h1>
                        <p className={ConfirmPopupStyle.popupMessage}>
                            ¿Estás seguro de que deseas eliminar a {integrante.nombre} {integrante.apellido}?
                        </p>
                        <div className={ConfirmPopupStyle.popupButtonGroup}>
                            <button
                                className={ConfirmPopupStyle.confirmButton}
                                onClick={async () => {
                                    try {
                                        await deleteIntegrante(integrante.id);
                                        toast.success("Integrante eliminado exitosamente");
                                        fetchIntegrantes();
                                        onClose();
                                    } catch (error) {
                                        toast.error("Error al eliminar el integrante");
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

    return (
        <main className={AdminPanelStyle.mainContent}>
            <div className={AdminPanelStyle.panelHeader}>
                <h1>Equipo</h1>
                <button className={AdminPanelStyle.addButton} onClick={handleCreateClick}>
                    Crear integrante
                </button>
            </div>

            <div className={AdminPanelStyle.adminTableContainer}>
                <table className={AdminPanelStyle.adminTable}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Detalles</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {integrantes.map((integrante) => (
                            <tr key={integrante.id}>
                                <td>{integrante.nombre} {integrante.apellido}</td>
                                <td>{integrante.especialidad}</td>
                                <td>
                                    <button
                                        className={AdminPanelStyle.actionButton}
                                        onClick={() => handleEditClick(integrante)}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        className={AdminPanelStyle.actionButton}
                                        onClick={() => handleDeleteClick(integrante)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ModalCrearIntegrante
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                integranteData={selectedIntegrante}
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

export default IntegranteTable;
