// CarruselInstituciones.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CarouselStyle from '../Styles/Carousel.module.css'; // Importar el CSS Module

const CarruselInstituciones = () => {
  const instituciones = [
    {
      nombre: 'Hospital Maciel',
      logo: '/public/img/logo_hospital_maciel.png',
      enlace: 'https://hospitalmaciel.com.uy/',
    },
    {
      nombre: 'Facultad de medicina',
      logo: '/public/img/logo_fmed.png',
      enlace: 'https://www.fmed.edu.uy/',
    },
    {
      nombre: 'Universidad de la República (UdelaR)',
      logo: '/public/img/logo_udelar.png',
      enlace: 'https://udelar.edu.uy/portal/',
    },
    {
      nombre: 'Sociedad de Cirugía del Uruguay',
      logo: '/public/img/logo_sociedad_cirugia.jpg',
      enlace: 'https://scu.org.uy/',
    },
    {
      nombre: 'Ministerio de Salud Pública ',
      logo: '/public/img/logo_mspjpg.jpg',
      enlace: 'https://www.gub.uy/ministerio-salud-publica/',
    },
    {
      nombre: 'ASSE',
      logo: '/public/img/logo_asse.jpeg',
      enlace: 'https://www.asse.com.uy/home',
    }
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
             
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarruselInstituciones;
