const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Directory where files will be saved

module.exports = function (app, database) {
  // Get Method for all photos
  app.get('/photos', (req, res) => {
    database.getPhotos()
      .then(photos => {
        console.log(photos);
        res.json(photos);
      })
      .catch(e => res.status(500).send(e));
  });

  // Get Method for a Single Photo by ID
  app.get('/photos/:photoId', (req, res) => {
    const photoId = req.params.photoId;

    database.getPhotoById(photoId)
      .then(photo => {
        if (photo) {
          console.log(photo);
          res.json(photo);
        } else {
          res.status(404).json({ "Message": "Photo not found" });
        }
      })
      .catch(e => res.status(500).send(e));
  });


  // Post Method for a Single Photo
  app.post('/photos', upload.single('photo'), (req, res) => {
    try {
      const photoFile = req.file; // Uploated file
      const { title, description, date } = req.body; // Other form information

      // Check if a file was uploaded
      if (!photoFile) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const photoFileName = req.file.filename;
      console.log(photoFileName);
      // Luego, en lugar de pasar los datos binarios, pasa el nombre del archivo
      database.createPhoto({ photo: photoFileName, title, description, date })
        .then(() => {
          res.json({ "Message": "New photo created" });
        })
        .catch(e => {
          console.error('Error inserting photo: ', e);
          res.status(500).json({ error: 'Something went wrong' });
        });
    } catch (error) {
      console.error('Error adding the photo: ', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  // Update Method (PUT)
  app.put('/photos/:photoId', (req, res) => {
    const photoId = req.params.photoId;
    const updatedPhoto = req.body;

    database.updatePhoto(photoId, updatedPhoto)
      .then(() => {
        res.json({ "Message": "Photo updated" });
        console.log("Photo with ID", photoId, "was updated");
      }).catch(e => {
        res.status(500).send(e);
      });
  });

  // Delete Method
  app.delete('/photos/:photoId', (req, res) => {
    const photoId = req.params.photoId;

    database.deletePhoto(photoId)
      .then(() => {
        res.json({ "Message": "Photo deleted" });
        console.log("Photo with ID ", photoId, " was deleted");
      }).catch(e => {
        res.status(500).send(e);
      });
  });
};
