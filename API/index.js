const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Multer = require('./core/multer');
const bookRoutes = require('./routes/books');

const app = express();

app.use(bodyParser.json());
app.use(Multer);
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/book', bookRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose.connect(
  'mongodb://localhost/my-books'
)
  .then(result => {
    app.listen(8085);
  })
  .catch(err => console.log(err));


