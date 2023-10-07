import React, { useState } from 'react';
import axios from 'axios';

const CreatePhoto = ({ onAddPhoto }) => {
  const [formData, setFormData] = useState({
    photo: null,
    title: '',
    description: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // If it is a files field, we access the files using e.target.files[0]
    const updatedValue = type === 'file' ? e.target.files[0] : value;
    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('photo', formData.photo);
      formDataToSubmit.append('title', formData.title);
      formDataToSubmit.append('description', formData.description);
      formDataToSubmit.append('date', formData.date);

      const response = await axios.post('http://localhost:8000/photos', formDataToSubmit);

      if (response.status === 201) {
        setFormData({
          photo: null,
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
          <label htmlFor="photo" className="form-label">Photo:</label>
          <input
            type="file"
            id="photo"
            name="photo"
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
