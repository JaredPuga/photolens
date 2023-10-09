import axios from 'axios';
import { useState, useEffect } from 'react';
import { Photo } from './Photo';

const port = 8000;
const URI = `http://localhost:${port}/photos`;

const ShowPhotos = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getPhotos();
  }, [photos]);

  // Base URL de tu servidor donde se almacenan las imágenes
  const serverBaseUrl = `http://localhost:${port}`;

  // To show all photos
  const getPhotos = async () => {
    try {
      const { data } = await axios.get(URI);
      setPhotos(data);
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
      <h2 className="mt-4 mb-4">Photo Gallery</h2>
      <table className="table table-bordered table-striped">
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
            <Photo key={photo.id} photo={photo} deletePhoto={deletePhoto} serverBaseUrl={serverBaseUrl}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowPhotos;
