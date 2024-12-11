import React, { useState, useEffect } from 'react';
import CardMateriales from '../Components/CardMatreriales'
import { getMateriales } from '../api/material-api';
import { toast } from 'react-toastify';
import styles from '../Styles/PublicEstudiantes.module.css';

const PublicEstudiantesDeGrado = () => {
  const [materiales, setMateriales] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Documento');

  const fetchMateriales = async () => {
    try {
      const response = await getMateriales();
      setMateriales(response.data);
    } catch (error) {
      toast.error("Error al obtener los materiales");
    }
  };

  useEffect(() => {
    fetchMateriales();
  }, []);

  const filterMateriales = (type) => {
    setActiveFilter(type);
  };

  const filteredMateriales =
    activeFilter === 'Documento'
      ? materiales
      : materiales.filter((material) => material.tipo === activeFilter);


  return (
    <div>
      <h1>Material para Estudiantes de Grado</h1>

      <div className={styles.filtersWrapper}>
        <div className={styles.filters}>
          <button
            className={`${styles.filterButton} ${activeFilter === 'Documento' ? styles.active : ''}`}
            onClick={() => filterMateriales('Documento')}
          >
            📄 Documentos
          </button>
          <button
            className={`${styles.filterButton} ${activeFilter === 'Imagen' ? styles.active : ''}`}
            onClick={() => filterMateriales('Imagen')}
          >
            🖼️ Imágenes
          </button>
          <button
            className={`${styles.filterButton} ${activeFilter === 'Video' ? styles.active : ''}`}
            onClick={() => filterMateriales('Video')}
          >
            🎥 Videos
          </button>
        </div>
      </div>

      <div className={styles.cardsContainer}>
        {filteredMateriales.map((material) => (
          <CardMateriales
            key={material.id}
            tipo={material.tipo}
            titulo={material.titulo}
            descripcion={material.descripcion}
          />
        ))}
      </div>

    </div>

  );
};

export default PublicEstudiantesDeGrado