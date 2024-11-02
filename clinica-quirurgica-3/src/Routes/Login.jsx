import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginStyle from '../Styles/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { userLogin } from '../api/login-api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usuario = { email, password };
      const response = await userLogin(usuario); 
      const token = response.data; 

      if (token) {
        localStorage.setItem('token', token); 
        navigate('/adminPanel');
        
      } else {
        setErrorMessage('No se pudo obtener el token de la respuesta.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={LoginStyle.container}>
      <button className={LoginStyle.buttonBack} onClick={handleBackClick}>
        <FontAwesomeIcon icon={faArrowLeft} /> Volver
      </button>

      <div className={LoginStyle.loginContainer}>
        <form className={LoginStyle.loginForm} onSubmit={handleSubmit}>
          <img src="img/logo.jpeg" alt="Logo" className={LoginStyle.logo} />
          <h4>Iniciar Sesión</h4>
          <p>Accede a tu cuenta de Clínica Quirúrgica 3</p>

          {errorMessage && <p className={LoginStyle.error}>{errorMessage}</p>}

          <div className={LoginStyle.formGroup}>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={LoginStyle.formGroup}>
            <div className={LoginStyle.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
};

export default Login;
