const express = require('express');
const { body } = require('express-validator/check');

const booksController = require("../books/books.controller");

const router = express.Router();

router.get('/books', booksController.getBooks);

router.get('/book/:bookId', booksController.getBook);

router.post('/book', booksController.createBook);

router.put('/book/:bookId', booksController.updateBook);

module.exports = router;