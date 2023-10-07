require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { database } = require('./services/database');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(bodyParser.json());

// CORS Main configurations
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};

app.use(cors(corsOptions));

const dbService = database();
require('./routes/routes')(app, dbService);

// If connection fails
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Desplay listener function in terminal
app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});