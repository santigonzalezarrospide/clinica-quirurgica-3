import React, { useState, useEffect } from "react";
import ModalStyle from "../Styles/ModalIntegrante.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ModalResetPassword = ({ isOpen, onClose, onSubmit }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentPassword("");
      setNewPassword("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      alert("Ambos campos son obligatorios.");
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
        <div className={ModalStyle.formGroup}>
            <div className={ModalStyle.passwordWrapper}>
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                placeholder="Contraseña Actual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                icon={showCurrentPassword ? faEye : faEyeSlash}
                className={ModalStyle.togglePassword}
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              />
            </div>
          </div>

          <div className={ModalStyle.formGroup}>
            <div className={ModalStyle.passwordWrapper}>
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Nueva Contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                icon={showNewPassword ? faEye : faEyeSlash}
                className={ModalStyle.togglePassword}
                onClick={() => setShowNewPassword(!showNewPassword)}
              />
            </div>
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
