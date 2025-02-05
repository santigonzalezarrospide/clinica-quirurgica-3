import React, { useState, useEffect } from "react";
import styles from "../Styles/MiCuenta.module.css";
import { getUsuarioById, updateUsuario, resetPassword } from "../api/administracion-api";
import ModalResetPassword from "../Components/ModalReset";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MiCuenta = () => {
    const [formData, setFormData] = useState({
        id: null,
        nombre: "",
        apellido: "",
        email: "",
    });
    const [initialData, setInitialData] = useState(null);
    const [hasChanges, setHasChanges] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);

    const getTokenAndUserId = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("No se encontró el token en localStorage. Por favor, autentícate.");
            return null;
        }

        try {
            const payloadBase64 = token.split(".")[1];
            const decodedPayload = JSON.parse(atob(payloadBase64));
            return decodedPayload.id;
        } catch (error) {
            toast.error("Error al decodificar el token.");
            return null;
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const userId = getTokenAndUserId();
                if (!userId) return;

                const user = await getUsuarioById(userId);
                setFormData({
                    id: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    email: user.email,
                });
                setInitialData({
                    id: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    email: user.email,
                });
            } catch (error) {
                toast.error("Error al cargar los datos del usuario.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);

        const isDifferent =
            initialData &&
            Object.keys(updatedFormData).some((key) => updatedFormData[key] !== initialData[key]);

        setHasChanges(isDifferent);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!hasChanges) return;

        setLoading(true);
        try {
            await updateUsuario(formData.id, {
                nombre: formData.nombre,
                apellido: formData.apellido,
                email: formData.email,
            });
            toast.success("Cambios guardados exitosamente.");
            setInitialData({ ...formData });
            setHasChanges(false);
        } catch (error) {
            toast.error("Hubo un error al guardar los cambios.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async ({ currentPassword, newPassword }) => {
        try {
            setLoading(true);
            await resetPassword(formData.id, currentPassword, newPassword);
            toast.success("Contraseña restablecida exitosamente.");
        } catch (error) {
            toast.error(error.message || "Error al restablecer la contraseña.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.mainContent}>

            <div className={styles.panelHeader}>
                <h1>Mi Cuenta</h1>
                <p>Actualiza tus datos personales y gestiona tu cuenta.</p>
            </div>
            <form className={styles.miCuentaForm} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="apellido">Apellido:</label>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>
                <button
                    type="submit"
                    className={`${styles.addButton} ${!hasChanges || loading ? styles.disabledButton : ""
                        }`}
                    disabled={!hasChanges || loading}
                >
                    {loading ? "Guardando..." : "Guardar Cambios"}
                </button>
                <button
                    type="button"
                    className={styles.resetButton}
                    onClick={() => setIsResetModalOpen(true)}
                    disabled={loading}
                >
                    Restablecer Contraseña
                </button>
            </form>

            {/* Modal para restablecer contraseña */}
            <ModalResetPassword
                isOpen={isResetModalOpen}
                onClose={() => setIsResetModalOpen(false)}
                onSubmit={handleResetPassword}
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
        </div>
    );
};

export default MiCuenta;
