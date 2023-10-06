import axios from 'axios';
import { useState, useEffect } from 'react';

const port = 8000;
const URI = `http://localhost:${port}/photos`;

const ShowPhotos = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getPhotos();
  }, []);

  // To show all photos
  const getPhotos = async () => {
    try {
      const res = await axios.get(URI);
      setPhotos(res.data);
    } catch (error) {
      console.error("Error fetching photos: ", error);
    }
  };

  // To delete a photo
  const deletePhoto = async (id) => {
    try {
      const res = await axios.delete(`${URI}/${id}`);
      getPhotos();
    } catch (error) {
      console.error("Error deleting photo: ", error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {photos.map((photo) => (
            <tr key={photo.id}>
              <td>{photo.id}</td>
              <td>
                <img src={photo.photo} alt={`Photo ${photo.id}`} />
              </td>
              <td>{photo.title}</td>
              <td>{photo.description}</td>
              <td>{photo.date}</td>
              <td>
                <button onClick={() => deletePhoto(photo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowPhotos;
