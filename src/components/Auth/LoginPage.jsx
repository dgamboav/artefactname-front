import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../config/config.json'; // Importa tu archivo de configuración

const API_BASE_URL = config.API_BASE_URL;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
        const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
        const { token } = response.data;
        // Guardar el token en el localStorage
        localStorage.setItem('authToken', token);
        // Redirigir a la página principal
        navigate('/home');
    } catch (error) {
        if (error.response && error.response.status === 401) {
            setError('Credenciales inválidas');
        } else {
            setError('Error al iniciar sesión');
            console.error('Error de login:', error);
        }
    }
  };

  return (
    // Contenedor principal: ocupa toda la pantalla, centrado y con fondo de imagen
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden font-inter">
      {/* Contenedor de la imagen de fondo */}
      {/* La imagen se coloca con 'bg-[url()]', 'bg-cover', 'bg-center' */}
      {/* 'opacity-70' para la semitransparencia y 'absolute inset-0 z-0' para cubrir todo el fondo */}
      <div
        className="absolute inset-0 bg-[url('/images/login-gif.gif')] bg-cover bg-center opacity-70 z-0"
        aria-hidden="true" // Ocultar para lectores de pantalla
      ></div>

      {/* Formulario de login: se superpone a la imagen de fondo con un z-index mayor */}
      <div className="relative bg-white bg-opacity-90 p-8 md:p-10 rounded-lg shadow-2xl w-full max-w-sm text-center z-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Bienvenido a Unity</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
              Usuario:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-6 text-left">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-5 rounded-md text-lg font-semibold cursor-pointer transition-colors duration-300 hover:bg-blue-700 shadow-md"
          >
            Login
          </button>

          <div className="mt-4 text-sm text-gray-600">
            <a href="/forgot-password" className="text-blue-600 no-underline hover:underline hover:text-blue-700 transition-colors duration-200">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
