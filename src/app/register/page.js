'use client'
import React, { useState } from 'react';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el envío del formulario de inicio de sesión
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <input
            type='Nombre'
            id = 'nombre'
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            value={email}
            onChange={handleEmailChange}
            required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-red-700 focus:ring-primary-500"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
