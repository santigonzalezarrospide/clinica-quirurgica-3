import React, { useState, useEffect } from 'react';
import ModalStyle from '../Styles/ModalIntegrante.module.css';

const AdminModal = ({ isOpen, onClose, usuData, isEdit, onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    if (isEdit && usuData) {
      setNombre(usuData.nombre);
      setApellido(usuData.apellido);
      setEmail(usuData.email);
    } else if (!isEdit) {
      setNombre('');
      setApellido('');
      setEmail('');
      setPass('');
    }
  }, [isEdit, usuData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('email', email);
    formData.append('password', pass);

    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;
  

  return (
    <div className={ModalStyle.modalOverlay}>
      <div className={ModalStyle.modalContent}>
        <button type="button" onClick={onClose}>&times;</button>
        <h2>{isEdit ? 'Editar Usuario' : 'Crear Usuario'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <input type="text" placeholder='Apellido' value={apellido} onChange={(e) => setApellido(e.target.value)} required />
          <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          {isEdit ?
            "" :
            <input type="password" placeholder='Contraseña' value={pass} onChange={(e) => setPass(e.target.value)} />
          }
          <button type="submit">{isEdit ? 'Editar Usuario' : 'Crear Usuario'}</button>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;
