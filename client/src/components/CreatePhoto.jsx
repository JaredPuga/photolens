import React, { useState } from 'react';
import axios from 'axios';

const CreatePhoto = ({ onAddPhoto }) => {
  // Local state for form data
  const [formData, setFormData] = useState({
    photo: '',
    title: '',
    description: '',
    date: '',
  });

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit the form data to the server
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to the server using axios.post
      const response = await axios.post('http://localhost:8000/photos', formData);

      // If the submission is successful, should receive a response from the server.
      if (response.status === 201) {
        // Perform necessary actions, like clearing the form.
        setFormData({
          photo: '',
          title: '',
          description: '',
          date: '',
        });

        console.log('Photo created successfully:', response.data);

        // Call the onAddPhoto function to update the list of photos in ShowPhotos
        onAddPhoto(response.data); // Assumes that response.data contains the new photo
      }
    } catch (error) {
      console.error('Error adding the photo: ', error);
    }
  };

  return (
    <div>
      <h2>Add New Photo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="photo">Photo URL:</label>
          <input
            type="text"
            id="photo"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Photo</button>
      </form>
    </div>
  );
};

export default CreatePhoto;
