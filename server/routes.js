module.exports = function (app, databaseService) {
  // Get Method
  app.get('/photos', (req, res) => {
    databaseService.getPhotos()
      .then(photos => res.json(photos))
      .catch(e => res.status(500).send(e));
  });

  // Post Method
  app.post('/photos', (req, res) => {
    const photo = req.body;
    console.log(photo);

    databaseService.createPhotoPost(photo)
      .then(() => {
        res.json({ "message": "new photo created" });
      }).catch(e => {
        res.status(500).send(e);
      });
  });
};