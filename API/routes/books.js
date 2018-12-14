const express = require('express');
const { body } = require('express-validator/check');

const booksController = require("../books/books.controller");
const booksFavorite = require("../books/books.favorite");

const router = express.Router();

router.get('/books', booksController.getBooks);

router.get('/book/:bookId', booksController.getBook);

router.post('/book', booksController.createBook);

router.put('/book/:bookId', booksController.updateBook);

router.delete('/book/:bookId', booksController.deleteBook);

router.get('/books/favorite', booksFavorite.getFavoriteBooks);

router.put('/book/favorite/:bookId', booksFavorite.favoriteBook);

module.exports = router;