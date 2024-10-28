import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginStyle from '../Styles/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={LoginStyle.container}>
      <button className={LoginStyle.buttonBack} onClick={handleBackClick}>
        <FontAwesomeIcon icon={faArrowLeft} />
        Volver
      </button>

      <div className={LoginStyle.loginContainer}>



        <form className={LoginStyle.loginForm} onSubmit={handleSubmit}>
          <img src="img/logo.jpeg" alt="Logo" className={LoginStyle.logo} />
          <h4>Iniciar Sesión</h4>
          <p>Accede a tu cuenta de Clínica Quirúrgica 3</p>

          <div className={LoginStyle.formGroup}>
            <input type="email" placeholder="tu@email.com" />
          </div>

          <div className={LoginStyle.formGroup}>
            <div className={LoginStyle.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'} placeholder="Contraseña" />

              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className={LoginStyle.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              />

            </div>
          </div>

          <button type="submit" className={LoginStyle.loginButton}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>

  );
}

export default Login