import React, { useState } from 'react';
import axios from 'axios';

const CreatePhoto = ({ onAddPhoto }) => {
  const [formData, setFormData] = useState({
    photo: '',
    title: '',
    description: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/photos', formData);

      if (response.status === 201) {
        setFormData({
          photo: '',
          title: '',
          description: '',
          date: '',
        });

        console.log('Photo created successfully:', response.data);

        onAddPhoto(response.data);
      }
    } catch (error) {
      console.error('Error adding the photo: ', error);
    }
  };

  return (
    <div>
      <h2>Add New Photo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">Photo URL:</label>
          <input
            type="text"
            id="photo"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Photo</button>
      </form>
    </div>
  );
};

export default CreatePhoto;
