import React from 'react';
import FooterStyle from '../Styles/Footer.module.css';
import { Link } from 'react-router-dom';
import { routes } from '../utils/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareXTwitter, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';

const getCurrentYear = () => {
    return new Date().getFullYear();
};

const Footer = () => {
    return (
        <footer className={FooterStyle.footer}>
            <div className={FooterStyle.footerContainer}>
                <div className={FooterStyle.footerColumn}>
                    <h4>Clínica Quirúrgica 3</h4>
                    <p>
                        También puedes seguirnos en nuestras redes sociales:
                    </p>
                    <div className={FooterStyle.socialIcons}>
                        {/* <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faSquareFacebook} />
                        </a>*/}
                        <a href="https://www.twitter.com/clinica_3" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faSquareXTwitter} />
                        </a>
                        <a href="https://www.instagram.com/clinicaquirurgica3" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faSquareInstagram} />
                        </a>
                    </div>
                </div>

                <div className={FooterStyle.footerColumn}>
                    <h4>Contacto</h4>
                    <p>Hospital Maciel, 25 de Mayo 174, 11000 <br /> Montevideo, Uruguay</p>
                    {/* <p>Teléfono: +54 (11) 1234-5678</p>  */}
                    <p>Email: clinicaquirurgica3@gmail.com</p>
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
                <p>© {getCurrentYear()} Clínica Quirúrgica 3. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
