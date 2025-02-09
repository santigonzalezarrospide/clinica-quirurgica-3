import React, { useState, useEffect } from 'react';
import styles from '../Styles/PublicEstudiantes.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { getBiblioteca } from '../api/biblioteca-api';
import CardBiblioteca from '../Components/CardBiblioteca';



import ReactPaginate from 'react-paginate';

const PublicBiblioteca = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const publicacionesPerPage = 10;

  const fetchPublicaciones = async () => {
    try {
      const response = await getBiblioteca();
      console.log(response.data);
      setPublicaciones(response.data);
    } catch (error) {
      toast.error('Error al obtener las publicaciones');
    }
  };

  useEffect(() => {
    fetchPublicaciones();
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * publicacionesPerPage;
  const currentPublicaciones = publicaciones.slice(offset, offset + publicacionesPerPage);

  return (
    <div>
      <h2 className={styles.h2}>Biblioteca</h2>

      <div className={styles.filtersWrapper}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Buscar..."
            className={styles.searchInput}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchIcon} />
        </div>
      </div>
      <div className={styles.table}>
        {currentPublicaciones.map((publicacion) => (
          <CardBiblioteca key={publicacion.id}
            title={publicacion.titulo}
            date={publicacion.anioPublicacion}
            description={publicacion.descripcion}
            autor={publicacion.autor}
            archivo={publicacion.archivo} />
        ))}
      </div>

      <div className={styles.pagination}>
        <ReactPaginate
          previousLabel={<button className={styles.paginationButton}>Anterior</button>}
          nextLabel={<button className={styles.paginationButton}>Siguiente</button>}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(publicaciones.length / publicacionesPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          activeClassName={`${styles.paginationActive} ${styles.activeDark}`}
        />
        
      </div>
      <span>Mostrando {currentPublicaciones.length} de {publicaciones.length} registros</span>
    </div>
  );
};

export default PublicBiblioteca;

