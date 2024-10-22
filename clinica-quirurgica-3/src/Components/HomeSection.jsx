import React from 'react';
import HomeSectionStyle from '../Styles/HomeSection.module.css';
import { Link } from 'react-router-dom';
import { routes } from '../utils/routes';

const HomeSection = () => {
    return (
        <section className={HomeSectionStyle.heroSection}>
            <div>
                <h1>Clínica Quirúrgica 3</h1>
                <p>Formando a los mejores profesionales médicos y brindando atención de calidad a nuestros pacientes.</p>
                <div className={HomeSectionStyle.btnContainer}>
                    <Link to={routes.contacto} className={HomeSectionStyle.sectionButton}>
                        Conoce más
                    </Link>
                    <Link to={routes.contacto} className={HomeSectionStyle.sectionButton}>
                        Contacto
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeSection;
