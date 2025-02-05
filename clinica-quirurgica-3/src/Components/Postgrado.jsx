import React, { useState, useEffect } from 'react';
import AdminPanelStyle from '../Styles/AdminPanel.module.css';
import { getMaterialesPosgrado, createMaterialPosgrado, updateMaterialPosgrado, deleteMaterialPosgrado, getMaterialByIdPosgrado } from '../api/posgrado-api';
import ConfirmPopupStyle from '../Styles/Alert.module.css';
import EstudianteModal from '../Components/EstudianteDeGradoModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Postgrado = () => {
    const [material, setMaterial] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    useEffect(() => {
        fetchMateriales();
    }, []);

    const fetchMateriales = async () => {
        try {
            const response = await getMaterialesPosgrado();
            console.log(response.data);
            setMaterial(response.data);
        } catch (error) {
            toast.error("Error al obtener los materiales");
        }
    };

    const handleCreateClick = () => {
        setIsEdit(false);
        setSelectedMaterial(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (material) => {
        setIsEdit(true);
        setSelectedMaterial(material);
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (materialData) => {
        try {
            if (isEdit) {
                await updateMaterialPosgrado(selectedMaterial.id, materialData);
                toast.success("Material editado exitosamente");
            } else {
                await createMaterialPosgrado(materialData);
                toast.success("Material creado exitosamente");
            }
            setIsModalOpen(false);
            fetchMateriales();
        } catch (error) {
            toast.error("Error al guardar el material");
        }
    };

    const handleDeleteClick = (material) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={ConfirmPopupStyle.popupContainer}>
                        <h1 className={ConfirmPopupStyle.popupTitle}>Eliminar Material</h1>
                        <p className={ConfirmPopupStyle.popupMessage}>
                            ¿Estás seguro de que deseas eliminar {material.titulo}?
                        </p>
                        <div className={ConfirmPopupStyle.popupButtonGroup}>
                            <button
                                className={ConfirmPopupStyle.confirmButton}
                                onClick={async () => {
                                    try {
                                        await deleteMaterialPosgrado(material.id);
                                        toast.success("Material eliminado exitosamente");
                                        fetchMateriales();
                                        onClose();
                                    } catch (error) {
                                        toast.error("Error al eliminar el material");
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
                <h1>Posgrado</h1>
                <button className={AdminPanelStyle.addButton} onClick={handleCreateClick}>
                    Agregar material
                </button>
            </div>

            <div className={AdminPanelStyle.adminTableContainer}>
                <table className={AdminPanelStyle.adminTable}>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Tipo de archivo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {material.map((mate) => (
                            <tr key={mate.id}>
                                <td>{mate.titulo}</td>
                                <td>{mate.tipo}</td>
                                <td>
                                    <button className={AdminPanelStyle.actionButton} onClick={() => handleEditClick(mate)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className={AdminPanelStyle.actionButton} onClick={() => handleDeleteClick(mate)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <EstudianteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                materialData={selectedMaterial}
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
}

export default Postgrado