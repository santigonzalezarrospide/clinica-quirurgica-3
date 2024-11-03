import React, { useState, useEffect } from 'react';
import ModalStyle from '../Styles/ModalIntegrante.module.css';

const ModalCrearIntegrante = ({ isOpen, onClose, integranteData, isEdit, onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [imagen, setImagen] = useState(null); // Cambiar a null para manejar archivos
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (isEdit && integranteData) {
      setNombre(integranteData.nombre);
      setApellido(integranteData.apellido);
      setEspecialidad(integranteData.especialidad);
      setImagen(null); // No cargamos la imagen aquí
      setDescripcion(integranteData.descripcion);
    } else if (!isEdit) {
      // Limpiar campos si estamos en modo de creación
      setNombre('');
      setApellido('');
      setEspecialidad('');
      setImagen(null); // Resetea la imagen
      setDescripcion('');
    }
  }, [isEdit, integranteData, isOpen]);

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]); // Guardamos el archivo seleccionado
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un objeto FormData para enviar los datos, incluyendo el archivo
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('especialidad', especialidad);
    formData.append('descripcion', descripcion);
    if (imagen) {
      formData.append('imagen', imagen); // Agrega el archivo de imagen solo si existe
    }

    onSubmit(formData); // Asegúrate de que el onSubmit maneje FormData
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={ModalStyle.modalOverlay}>
      <div className={ModalStyle.modalContent}>
        <button type="button" onClick={onClose}>&times;</button>
        <h2>{isEdit ? 'Editar Integrante' : 'Crear Integrante'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
          <input type="text" placeholder='Apellido' value={apellido} onChange={(e) => setApellido(e.target.value)} required/>
          <input type="text" placeholder='Especialidad' value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} required/>
          <input type="file" onChange={handleImageChange} /> {/* Input para subir imagen */}
          <textarea placeholder='Descripción' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows="3" />
          <button type="submit">{isEdit ? 'Editar Integrante' : 'Crear Integrante'}</button>
        </form>
      </div>
    </div>
  );
};

export default ModalCrearIntegrante;
