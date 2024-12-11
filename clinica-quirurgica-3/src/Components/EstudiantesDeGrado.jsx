import React, { useState, useEffect } from 'react';
import AdminPanelStyle from '../Styles/AdminPanel.module.css';
import { getMateriales, createMaterial, updateMaterial, deleteMaterial, getMaterialById } from '../api/material-api';
import ConfirmPopupStyle from '../Styles/Alert.module.css';
import EstudianteModal from '../Components/EstudianteDeGradoModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const EstudiantesDeGrado = () => {
    const [material, setMaterial] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    useEffect(() => {
        fetchMateriales();
    }, []);

    const fetchMateriales = async () => {
        try {
            const response = await getMateriales();
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
                await updateMaterial(selectedMaterial.id, materialData);
                toast.success("Material editado exitosamente");
            } else {
                await createMaterial(materialData);
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
                                        await deleteMaterial(material.id);
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

    const handleDownloadClick = async (material) => {
        console.log("Material recibido:", material);
        
        // Verifica si el material tiene un archivo disponible
        if (!material.archivo) {
            toast.error("No hay archivo disponible para descargar");
            return;
        }
    
        try {
            // Usamos getMaterialById para obtener los datos del material con su ID
            const response = await getMaterialById(material.id);
    
            // Verifica que la respuesta y el archivo estén disponibles
            if (response && response.archivo) {
                // Si la respuesta tiene un archivo, lo manejamos como un Blob
                const blob = new Blob([response.archivo], { type: response.tipo });
                
                // Crea un enlace de descarga
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob); // Creamos un URL de objeto para el Blob
                link.href = url;
                link.download = material.titulo || 'archivo'; // Usamos el título como nombre del archivo
                link.click(); // Simulamos el clic en el enlace para iniciar la descarga
            } else {
                toast.error("No se pudo obtener el archivo.");
            }
        } catch (error) {
            // Maneja cualquier error que ocurra durante el proceso de descarga
            console.error("Error al intentar descargar el archivo:", error);
            toast.error("Error al intentar descargar el archivo");
        }
    };
    
      

    return (
        <main className={AdminPanelStyle.mainContent}>
            <div className={AdminPanelStyle.panelHeader}>
                <h1>Estudiantes de grado</h1>
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
                                    <button className={AdminPanelStyle.actionButton} onClick={() => handleDownloadClick(mate)}>
                                        <FontAwesomeIcon icon={faDownload} />
                                    </button>
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
};

export default EstudiantesDeGrado;
