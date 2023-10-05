module.exports = function (app, database) {
  // Get Method
  app.get('/photos', (req, res) => {
    database.getPhotos()
      .then(photos => {
        console.log(photos);
        res.json(photos);
      })
      .catch(e => res.status(500).send(e));
  });

  // Post Method
  app.post('/photos', (req, res) => {
    const photo = req.body;
    console.log(photo);

    database.createPhoto(photo)
      .then(() => {
        res.json({ "Message": "New photo created" });
      }).catch(e => {
        res.status(500).send(e);
      });
  });

  // Update Method (PUT or PATCH)
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