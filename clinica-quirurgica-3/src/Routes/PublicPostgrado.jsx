import React, { useState, useEffect } from 'react';
import CardMateriales from '../Components/CardMatreriales';
import { getMaterialesPosgrado } from '../api/posgrado-api';
import { toast } from 'react-toastify';
import styles from '../Styles/PublicEstudiantes.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faVideo, faImage, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';

const PublicPostgrado = () => {
  const [materiales, setMateriales] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Documento');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMateriales, setFilteredMateriales] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const materialesPerPage = 6;

  // Pluralización correcta
  const pluralMap = {
    Documento: 'documentos',
    Imagen: 'imágenes',
    Video: 'videos',
  };

  const fetchMateriales = async () => {
    try {
      const response = await getMaterialesPosgrado();
      setMateriales(response.data);
      filterMateriales(response.data, activeFilter, searchQuery);
    } catch (error) {
      toast.error('Error al obtener los materiales');
    }
  };

  useEffect(() => {
    fetchMateriales();
  }, []);

  const filterMateriales = (data, type, query) => {
    const filtered = data.filter(
      (material) =>
        material.tipo === type &&
        material.titulo.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMateriales(filtered);
  };

  const handleFilterChange = (type) => {
    setActiveFilter(type);
    setCurrentPage(0);
    filterMateriales(materiales, type, searchQuery);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(0);
    filterMateriales(materiales, activeFilter, query);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * materialesPerPage;
  const currentMateriales = filteredMateriales.slice(offset, offset + materialesPerPage);

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
            onChange={handleSearchChange}
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

      {/* Lista de materiales paginados */}
      <div className={styles.cardsContainer}>
        {currentMateriales.length > 0 ? (
          currentMateriales.map((material) => (
            <CardMateriales
              key={material.id}
              tipo={material.tipo}
              titulo={material.titulo}
              descripcion={material.descripcion}
              archivo={material.archivo}
              videoUrl={material.url}
            />
          ))
        ) : (
          <p>No se encontraron  {pluralMap[activeFilter]}.</p>
        )}
      </div>

      {filteredMateriales.length > materialesPerPage && (
        <div className={styles.pagination}>
          <div className={styles.paginationInner}>
            <ReactPaginate
              previousLabel={<button className={styles.paginationButton}>Anterior</button>}
              nextLabel={<button className={styles.paginationButton}>Siguiente</button>}
              pageCount={Math.ceil(filteredMateriales.length / materialesPerPage)}
              onPageChange={handlePageClick}
              containerClassName={styles.paginationList}
              activeLinkClassName={styles.paginationActive}
              forcePage={currentPage}
            />
            <span className={styles.paginationInfo}>
              Mostrando {currentMateriales.length} de {filteredMateriales.length} {pluralMap[activeFilter]}
            </span>

          </div>

        </div>
      )}
    </div>
  );
};

export default PublicPostgrado;
