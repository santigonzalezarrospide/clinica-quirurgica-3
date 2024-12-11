import React, { useState, useEffect } from 'react';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../api/administracion-api';
import AdminPanelStyle from '../Styles/AdminPanel.module.css';
import ConfirmPopupStyle from '../Styles/Alert.module.css';
import AdminModal from '../Components/AdminModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Administracion = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedUsu, setSelectedUsu] = useState(null);


    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const response = await getUsuarios();
            console.log(response.data);
            setUsuarios(response.data);
        } catch (error) {
            toast.error("Error al obtener los Usuarios");
        }
    };

    const handleCreateClick = () => {
        setIsEdit(false);
        setSelectedUsu(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (usuario) => {
        setIsEdit(true);
        setSelectedUsu(usuario);
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (usuData) => {
        try {
            if (isEdit) {
                await updateUsuario(selectedUsu.id, usuData);
                toast.success("Usuario editado exitosamente");
            } else {
                await createUsuario(usuData);
                toast.success("Usuario creado exitosamente");
            }
            setIsModalOpen(false);
            fetchUsuarios();
        } catch (error) {
            toast.error("Error al guardar el usuario");
        }
    };

    const handleDeleteClick = (usuario) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={ConfirmPopupStyle.popupContainer}>
                        <h1 className={ConfirmPopupStyle.popupTitle}>Eliminar Usuario</h1>
                        <p className={ConfirmPopupStyle.popupMessage}>
                            ¿Estás seguro de que deseas eliminar a {usuario.nombre} {usuario.apellido}?
                        </p>
                        <div className={ConfirmPopupStyle.popupButtonGroup}>
                            <button
                                className={ConfirmPopupStyle.confirmButton}
                                onClick={async () => {
                                    try {
                                        await deleteUsuario(usuario.id);
                                        toast.success("Usuario eliminado exitosamente");
                                        fetchUsuarios();
                                        onClose();
                                    } catch (error) {
                                        toast.error("Error al eliminar el usuario");
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
                <h1>Administación de usuarios</h1>
                <button className={AdminPanelStyle.addButton} onClick={handleCreateClick}>
                    Crear usuario
                </button>
            </div>

            <div className={AdminPanelStyle.adminTableContainer}>
                <table className={AdminPanelStyle.adminTable}>
                    <thead>
                        <tr>
                            <th>Nombre, Apellido</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.nombre} {usuario.apellido}</td>
                                <td>{usuario.email}</td>
                                <td>
                                    <button className={AdminPanelStyle.actionButton} onClick={() => handleEditClick(usuario)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>

                                    <button className={AdminPanelStyle.actionButton} onClick={() => handleDeleteClick(usuario)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                usuData={selectedUsu}
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

export default Administracion;
