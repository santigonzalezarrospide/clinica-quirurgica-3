// ModalCrearIntegrante.jsx
import React, { useState, useEffect } from 'react';
import ModalStyle from '../Styles/ModalIntegrante.module.css';
import { createIntegrante, updateIntegrante } from '../api/integrantes-api';

const ModalCrearIntegrante = ({ isOpen, onClose, integranteData, isEdit, onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (isEdit && integranteData) {
      setNombre(integranteData.nombre);
      setApellido(integranteData.apellido);
      setEspecialidad(integranteData.especialidad);
      setImagen(integranteData.imagen);
      setDescripcion(integranteData.descripcion);
    } else {
      setNombre('');
      setApellido('');
      setEspecialidad('');
      setImagen('');
      setDescripcion('');
    }
  }, [isEdit, integranteData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateIntegrante(integranteData.id, {
          nombre,
          apellido,
          especialidad,
          imagen,
          descripcion,
        });
      } else {
        const response = await createIntegrante({
          nombre,
          apellido,
          especialidad,
          imagen,
          descripcion,
        });
        onSubmit(response.data);
      }
      onClose();
    } catch (error) {
      console.error('Error al crear/editar el integrante:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={ModalStyle.modalOverlay}>
      <div className={ModalStyle.modalContent}>
        <button type="button" onClick={onClose}>&times;</button>

        <h2>{isEdit ? 'Editar Integrante' : 'Crear Integrante'}</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />

          <input type="text" placeholder='Apellido' value={apellido} onChange={(e) => setApellido(e.target.value)} />

          <input type="text" placeholder='Especialidad' value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} />

          <input type="text" placeholder='Foto' value={imagen} onChange={(e) => setImagen(e.target.value)} />

          <textarea placeholder='Descripción' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows="3" />

          <button type="submit"> {isEdit ? 'Editar Integrante' : 'Crear Integrante'} </button>
        </form>
      </div>
    </div>
  );
};

export default ModalCrearIntegrante;
