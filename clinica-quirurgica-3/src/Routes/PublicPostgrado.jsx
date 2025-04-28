import React, { useState, useEffect } from 'react';
import CardMateriales from '../Components/CardMatreriales';
import { getMaterialesPosgrado } from '../api/posgrado-api';
import { toast } from 'react-toastify';
import styles from '../Styles/PublicEstudiantes.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faVideo, faImage, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const PublicPostgrado = () => {
  const [materiales, setMateriales] = useState([]); // Todos los materiales
  const [activeFilter, setActiveFilter] = useState('Documento'); // Filtro activo (tipo)
  const [searchQuery, setSearchQuery] = useState(''); // Valor del input de búsqueda
  const [filteredMateriales, setFilteredMateriales] = useState([]); // Materiales filtrados

  const fetchMateriales = async () => {
    try {
      const response = await getMaterialesPosgrado();
      console.log(response.data);
      setMateriales(response.data);
      filterMateriales(response.data, 'Documento', '');
    } catch (error) {
      toast.error('Error al obtener los materiales');
    }
  };

  useEffect(() => {
    fetchMateriales();
  }, []);

  // Filtrar materiales por tipo y título
  const filterMateriales = (data, type, query) => {
    const filtered = data.filter(
      (material) =>
        material.tipo === type && material.titulo.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMateriales(filtered);
  };

  // Manejar cambios en el filtro de tipo
  const handleFilterChange = (type) => {
    setActiveFilter(type);
    filterMateriales(materiales, type, searchQuery);
  };

  // Manejar cambios en el input de búsqueda
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterMateriales(materiales, activeFilter, query);
  };

  return (
    <div>
      <h2 className={styles.h2}>Material para Posgrado</h2>

      {/* Barra de búsqueda y filtros */}
      <div className={styles.filtersWrapper}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Buscar..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange} // Actualiza el estado de búsqueda
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
        </div>
        <div className={styles.filters}>
          <button
            className={`${styles.filterButton} ${activeFilter === 'Documento' ? styles.active : ''}`}
            onClick={() => handleFilterChange('Documento')}
          >
            <FontAwesomeIcon icon={faFile} className={styles.filterIcon} /> Documentos
          </button>
          <button
            className={`${styles.filterButton} ${activeFilter === 'Imagen' ? styles.active : ''}`}
            onClick={() => handleFilterChange('Imagen')}
          >
            <FontAwesomeIcon icon={faImage} className={styles.filterIcon} /> Imágenes
          </button>
          <button
            className={`${styles.filterButton} ${activeFilter === 'Video' ? styles.active : ''}`}
            onClick={() => handleFilterChange('Video')}
          >
            <FontAwesomeIcon icon={faVideo} className={styles.filterIcon} /> Videos
          </button>
        </div>
      </div>

      {/* Lista de materiales filtrados */}
      <div className={styles.cardsContainer}>
        {filteredMateriales.length > 0 ? (
          filteredMateriales.map((material) => (
            <CardMateriales
              key={material.id}
              tipo={material.tipo}
              titulo={material.titulo}
              descripcion={material.descripcion}
              archivo={material.archivo}
            />
          ))
        ) : (
          <p>No se encontraron materiales.</p>
        )}
      </div>
    </div>
  );
};

export default PublicPostgrado;
