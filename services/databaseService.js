const databaseService = () => {
  const knex = require('knex')({
    client: 'mysql',
    connection: {
      database: process.env.DB,
      host: process.env.DB_HOST,
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    }
  });

  const table = 'photos';

  const getPhotos = () => {
    return knex(table).select();
  };

  const createPhotoPost = ({ photo, title, description, date }) => {
    return knex(table).insert({
      photo: photo,
      title: title,
      description: description,
      date: date
    });
  };
  return { createPhotoPost, getPhotos };
};

module.exports = {
  databaseService
};