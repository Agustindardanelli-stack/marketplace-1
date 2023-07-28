'use client'
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario, por ejemplo, mediante una solicitud HTTP o enviando un correo electrónico.
    // Por simplicidad, aquí solo reiniciamos los datos del formulario.
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    console.log(setFormData)
  };
  return (
    <div className="container mx-auto p-4 rounded-2xl ">
      <h2 className="text-2xl font-semibold mb-4">Contacto</h2>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block font-medium mb-2">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSubmit}
            
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;

