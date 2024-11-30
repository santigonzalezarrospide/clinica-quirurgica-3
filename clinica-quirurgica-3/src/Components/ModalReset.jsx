import React, { useState, useEffect } from "react";
import ModalStyle from "../Styles/ModalIntegrante.module.css";

const ModalResetPassword = ({ isOpen, onClose, onSubmit }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setCurrentPassword("");
      setNewPassword("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      alert("Ambos campos son obligatorios."); // Puedes reemplazar esto con `toast.error`
      return;
    }
    onSubmit({ currentPassword, newPassword });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={ModalStyle.modalOverlay}>
      <div className={ModalStyle.modalContent}>
        <button type="button" onClick={onClose}>
          &times;
        </button>
        <h2>Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className={ModalStyle.inputGroup}>
            <label htmlFor="currentPassword">Contraseña Actual:</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className={ModalStyle.inputGroup}>
            <label htmlFor="newPassword">Nueva Contraseña:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={ModalStyle.saveButton}>
            Restablecer
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalResetPassword;
