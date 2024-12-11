import React, { useState, useRef, useEffect } from 'react';
import NavbarStyle from '../Styles/Navbar.module.css';
import { Link } from 'react-router-dom';
import { routes } from '../utils/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className={NavbarStyle.nav}>
            <Link to={routes.inicio} className={NavbarStyle.navLogoContainer}>
                <img src="/img/logo.jpeg" alt="Logo CQ3" className={NavbarStyle.navLogo} />
                <span className={NavbarStyle.navTitle}>Clínica Quirúrgica 3</span>
            </Link>

            <button className={NavbarStyle.hamburger} onClick={toggleMenu}>
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </button>

            <ul className={`${NavbarStyle.navList} ${isMenuOpen ? NavbarStyle.showMenu : ''}`}>

                {/* <li className={NavbarStyle.navListLi} ref={dropdownRef}>
                    <h4 className={NavbarStyle.navMenu} onClick={toggleDropdown}>
                        Estudiantes de grado{' '}
                        <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: '0.8em', marginLeft: '3px' }} />
                    </h4>
                    {isDropdownOpen && (
                        <ul className={NavbarStyle.dropdownMenu}>
                            <li className={NavbarStyle.dropdownItem}>
                                <Link to={routes.material}>Material didáctico</Link>
                            </li>
                            <li className={NavbarStyle.dropdownItem}>
                                <Link to={routes.video}>Videos</Link>
                            </li>
                            <li className={NavbarStyle.dropdownItem}>
                                <Link to={routes.archivo}>Archivos</Link>
                            </li>
                        </ul>
                    )}
                </li>*/}

                <li className={NavbarStyle.navListLi}>
                    <Link to={routes.grado}>
                        <h4 className={NavbarStyle.navMenu}>Estudiantes de grado</h4>
                    </Link>
                </li>

                <li className={NavbarStyle.navListLi}>
                    <Link to={routes.postgrado}>
                        <h4 className={NavbarStyle.navMenu}>Posgrados</h4>
                    </Link>
                </li>

                <li className={NavbarStyle.navListLi}>
                    <Link to={routes.paciente}>
                        <h4 className={NavbarStyle.navMenu}>Usuarios</h4>
                    </Link>
                </li>

                <li className={NavbarStyle.navListLi}>
                    <Link to={routes.equipo}>
                        <h4 className={NavbarStyle.navMenu}>Equipo</h4>
                    </Link>
                </li>

                <li className={NavbarStyle.navListLi}>
                    <Link to={routes.biblioteca}>
                        <h4 className={NavbarStyle.navMenu}>Biblioteca</h4>
                    </Link>
                </li>

                <li className={NavbarStyle.navListLi}>
                    <Link to={routes.unidades}>
                        <h4 className={NavbarStyle.navMenu}>Unidades Asistenciales</h4>
                    </Link>
                </li>

                <li className={NavbarStyle.navListLi}>
                    <Link to={routes.contacto}>
                        <h4 className={NavbarStyle.navMenu}>Contacto</h4>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
