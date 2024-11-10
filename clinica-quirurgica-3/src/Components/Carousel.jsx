// CarruselInstituciones.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CarouselStyle from '../Styles/Carousel.module.css'; // Importar el CSS Module

const CarruselInstituciones = () => {
  const instituciones = [
    {
      nombre: 'Institución 1',
      logo: 'ruta/logo1.png',
      enlace: 'https://www.institucion1.com',
    },
    {
      nombre: 'Institución 2',
      logo: 'ruta/logo2.png',
      enlace: 'https://www.institucion2.com',
    },
    {
      nombre: 'Institución 3',
      logo: 'ruta/logo3.png',
      enlace: 'https://www.institucion3.com',
    },
    {
      nombre: 'Institución 4',
      logo: 'ruta/logo4.png',
      enlace: 'https://www.institucion4.com',
    },
    {
      nombre: 'Institución 5',
      logo: 'ruta/logo5.png',
      enlace: 'https://www.institucion5.com',
    },
    {
      nombre: 'Institución 6',
      logo: 'ruta/logo6.png',
      enlace: 'https://www.institucion6.com',
    },
    {
      nombre: 'Institución 7',
      logo: 'ruta/logo7.png',
      enlace: 'https://www.institucion7.com',
    },
    {
      nombre: 'Institución 8',
      logo: 'ruta/logo8.png',
      enlace: 'https://www.institucion8.com',
    },
    {
      nombre: 'Institución 9',
      logo: 'ruta/logo9.png',
      enlace: 'https://www.institucion9.com',
    },
    {
      nombre: 'Institución 10',
      logo: 'ruta/logo10.png',
      enlace: 'https://www.institucion10.com',
    },
  ];

  const settings = {
    dots: false, // Mostrar los puntos indicadores
    infinite: true, // Loop infinito
    speed: 500, // Velocidad de transición
    slidesToShow: 4, // Número de tarjetas visibles
    slidesToScroll: 1, // Número de tarjetas que se desplazan
    autoplay: true, // Habilitar el desplazamiento automático
    autoplaySpeed: 3000, // Intervalo de tiempo entre cada desplazamiento (en milisegundos)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={CarouselStyle.carruselContainer}>
      <Slider {...settings}>
        {instituciones.map((institucion, index) => (
          <div key={index} className={CarouselStyle.institucionCard}>
            <a href={institucion.enlace} target="_blank" rel="noopener noreferrer">
              <img src={institucion.logo} alt={institucion.nombre} className={CarouselStyle.logo} />
              <p className={CarouselStyle.institucionNombre}>{institucion.nombre}</p>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarruselInstituciones;
