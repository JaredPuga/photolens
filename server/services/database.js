const database = () => {
  const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB,
    }
  });

  // Tables
  const photosTable = 'photos';

  // To get all photos
  const getPhotos = () => {
    return knex(photosTable).select();
  };

  // To create a new photo
  const createPhoto = ({ photo, title, description, date }) => {
    return knex(photosTable).insert({
      photo: photo,
      title: title,
      description: description,
      date: date
    });
  };

  // To update a photo by ID
  const updatePhoto = (photoId, updatedPhoto) => {
    return knex(photosTable)
      .where({ id: photoId })
      .update(updatedPhoto);
  };

  // To delete a photo by ID
  const deletePhoto = (photoId) => {
    return knex(photosTable)
      .where({ id: photoId })
      .del();
  };

  return { createPhoto, getPhotos, updatePhoto, deletePhoto };
};

module.exports = {
  database
};