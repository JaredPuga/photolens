require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const { database } = require('./services/database');

const app = express();

app.use(bodyParser.json());

const dbService = database();
require('./routes/routes')(app, dbService);

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});