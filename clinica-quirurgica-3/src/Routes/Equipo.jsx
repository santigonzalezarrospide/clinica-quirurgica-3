import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../Components/CardEquipo';
import EquipoStyle from '../Styles/Equipo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getIntegrantes } from '../api/integrantes-api';

const Equipo = () => {
    const navigate = useNavigate();
    const [integrantes, setIntegrantes] = useState([]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const fetchIntegrantes = async () => {
        try {
            const response = await getIntegrantes();
            console.log(response.data)
            setIntegrantes(response.data);
        } catch (error) {
            console.error("Error al obtener los integrantes:", error);
        }
    };

    useEffect(() => {
        fetchIntegrantes();
    }, []);

    return (
        <div>
            <h2 className={EquipoStyle.h2}>Sobre nosotros</h2>

            <div className={EquipoStyle.descripcion}>
                <ul>
                    <li>La Clínica quirúrgica 3 es un servicio universitario de la Facultad de Medicina de la Universidad de la República (Udelar), que funciona en el Hospital Maciel de Montevideo y también en los hospitales regionales de Salto y Paysandú.</li>
                    <li>Forma parte de la Administración de los Servicios de Salud del Estado (ASSE) y cumple funciones clave en asistencia, docencia e investigación en cirugía general.</li>
                    <li>La Clínica Quirúrgica 3 tiene como misión brindar atención médica de alta calidad, integrando la formación de estudiantes de grado y posgrado, así como el desarrollo de investigación aplicada.</li>
                    <li>Su enfoque se basa en principios éticos como la solidaridad y la cooperación, y promueve un modelo de salud integral y humanista, con énfasis en la justicia social y el respeto por la diversidad.</li>
                    <li>Además, contribuye activamente a la formación de recursos humanos en salud, la investigación básica y aplicada, y la extensión universitaria, integrando estas funciones en el trabajo directo con la comunidad.</li>
                    <li>También colabora con otros servicios universitarios y agentes sanitarios públicos y privados para potenciar el logro de objetivos comunes.</li>
                    <li>En Montevideo, el equipo está liderado por el Prof. Dr. Daniel González como Profesor Titular. Lo acompañan profesores agregados, adjuntos, asistentes, residentes y personal administrativo.</li>
                    <li>En Salto y Paysandú, también hay equipos docentes y asistenciales asegurando cobertura regional.</li>
                    <li>La Clínica ofrece materiales educativos y publicaciones para estudiantes de medicina, disponibles en su sitio web oficial, y tiene presencia activa en redes sociales como Instagram y X.</li>
                </ul>
            </div>

            <div className={EquipoStyle.cardsContainer}>
                {integrantes.map((integrante) => (
                    <ProfileCard
                        key={integrante.id}
                        image={integrante.imagen}
                        name={integrante.nombre}
                        apellido={integrante.apellido}
                        specialty={integrante.especialidad}
                        description={integrante.descripcion}
                    />
                ))}
            </div>

            <div className={EquipoStyle.buttonContainer}>
                <button className={EquipoStyle.buttonBack} onClick={handleBackClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Volver
                </button>
            </div>
        </div>
    );
}

export default Equipo;
