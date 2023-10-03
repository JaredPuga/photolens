import React, { useState } from 'react';

function PhotoForm() {
  const [photoData, setPhotoData] = useState({
    title: '',
    description: '',
    date: '',
    file: null, // To save the photo file
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPhotoData({
      ...photoData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhotoData({
      ...photoData,
      file: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', photoData.title);
    formData.append('description', photoData.description);
    formData.append('date', photoData.date);
    formData.append('photo', photoData.file);

    try {
      const response = await fetch('/photos', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('Foto subida exitosamente');
      } else {
        console.error('Error al subir la foto');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div>
      <h2>Subir una nueva foto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={photoData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={photoData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Fecha:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={photoData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="photo">Foto:</label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleFileChange}
            accept="image/*"
          //required
          />
        </div>
        <div>
          <button type="submit">Subir Foto</button>
        </div>
      </form>
    </div>
  );
}

export default PhotoForm;