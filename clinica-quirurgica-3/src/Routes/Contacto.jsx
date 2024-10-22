import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactStyle from '../Styles/Contacto.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot, faPaperPlane, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Contacto = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        asunto: '',
        mensaje: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', formData);
        alert('Formulario enviado con éxito');
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className={ContactStyle.container}>
            <button className={ContactStyle.buttonBack} onClick={handleBackClick}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Volver
            </button>

            <div className={ContactStyle.contactContainer}>
                <div className={ContactStyle.contactInfo}>
                    <h2>Contáctenos</h2>
                    <p>
                        Estamos aquí para responder a sus preguntas y escuchar sus comentarios. No dude en ponerse en contacto con nosotros.
                    </p>

                    <ul>
                        <li>
                            <FontAwesomeIcon icon={faPhone} />
                            <span className={ContactStyle.separator}>+1 (555) 123-4567</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span className={ContactStyle.separator}>info@clinicaquirurgica3.com</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span className={ContactStyle.separator}>123 Calle Principal, Ciudad, País</span>
                        </li>
                    </ul>
                </div>

                <form className={ContactStyle.contactForm} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo Electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="asunto"
                        placeholder="Asunto"
                        value={formData.asunto}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="mensaje"
                        placeholder="Mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">
                        <FontAwesomeIcon icon={faPaperPlane} /> Enviar Mensaje
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contacto;
