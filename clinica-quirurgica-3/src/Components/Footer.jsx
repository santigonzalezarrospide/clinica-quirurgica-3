import React from 'react';
import FooterStyle from '../Styles/Footer.module.css';
import { Link } from 'react-router-dom';
import { routes } from '../utils/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareXTwitter, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
    return (
        <footer className={FooterStyle.footer}>
            <div className={FooterStyle.footerContainer}>
                <div className={FooterStyle.footerColumn}>
                    <h4>Clínica Quirúrgica 3</h4>
                    <p>
                        Brindando atención quirúrgica de excelencia y cuidado médico
                        especializado desde 1985.
                    </p>
                    <div className={FooterStyle.socialIcons}>
                        <a href="#">
                            <FontAwesomeIcon icon={faSquareFacebook} />
                        </a>
                        <a href="#">
                            <FontAwesomeIcon icon={faSquareXTwitter} />
                        </a>
                        <a href="#">
                            <FontAwesomeIcon icon={faSquareInstagram} />
                        </a>
                    </div>
                </div>

                <div className={FooterStyle.footerColumn}>
                    <h4>Contacto</h4>
                    <p>Av. Corrientes 1234, C1043AAZ<br />Buenos Aires, Argentina</p>
                    <p>Teléfono: +54 (11) 1234-5678</p>
                    <p>Email: info@clinicaquirurgica3.com</p>
                </div>

                <div className={FooterStyle.footerColumn}>
                    <h4>Administración</h4>
                    <ul>
                        <li>
                            <Link to={routes.login}>Administración</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={FooterStyle.footerBottom}>
                <p>© 2024 Clínica Quirúrgica 3. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
