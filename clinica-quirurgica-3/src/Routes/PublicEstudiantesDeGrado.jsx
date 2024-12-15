import React, { useState, useEffect } from 'react';
import CardMateriales from '../Components/CardMatreriales';
import { getMateriales } from '../api/material-api';
import { toast } from 'react-toastify';
import styles from '../Styles/PublicEstudiantes.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faVideo, faImage } from '@fortawesome/free-solid-svg-icons';

const PublicEstudiantesDeGrado = () => {
  const [materiales, setMateriales] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Documento');
  const [filteredMateriales, setFilteredMateriales] = useState([]);

  const fetchMateriales = async () => {
    try {
      const response = await getMateriales();
      setMateriales(response.data);
      console.log(response.data);
      

      const initialFiltered = response.data.filter((material) => material.tipo === 'Documento');
      setFilteredMateriales(initialFiltered);
    } catch (error) {
      toast.error('Error al obtener los materiales');
    }
  };

  useEffect(() => {
    fetchMateriales();
  }, []);

  const filterMateriales = (type) => {
    setActiveFilter(type);

    const filtered = materiales.filter((material) => material.tipo === type);
    setFilteredMateriales(filtered);
  };

  return (
    <div>
      <h2 className={styles.h2}>Material para Estudiantes de Grado</h2>

      <div className={styles.filtersWrapper}>
        <div className={styles.filters}>
          <button
            className={`${styles.filterButton} ${activeFilter === 'Documento' ? styles.active : ''}`}
            onClick={() => filterMateriales('Documento')}
          >
            <FontAwesomeIcon icon={faFile} /> Documentos
          </button>
          <button
            className={`${styles.filterButton} ${activeFilter === 'Imagen' ? styles.active : ''}`}
            onClick={() => filterMateriales('Imagen')}
          >
            <FontAwesomeIcon icon={faImage} /> Imágenes
          </button>
          <button
            className={`${styles.filterButton} ${activeFilter === 'Video' ? styles.active : ''}`}
            onClick={() => filterMateriales('Video')}
          >
           <FontAwesomeIcon icon={faVideo} /> Videos
          </button>
        </div>
      </div>

      {/* Lista de materiales filtrados */}
      <div className={styles.cardsContainer}>
        {filteredMateriales.map((material) => (
          <CardMateriales
            key={material.id}
            tipo={material.tipo}
            titulo={material.titulo}
            descripcion={material.descripcion}
            archivo={material.archivo}
          />
        ))}
      </div>
    </div>
  );
};

export default PublicEstudiantesDeGrado;
