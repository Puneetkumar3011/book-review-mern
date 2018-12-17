const express = require('express');
const { body } = require('express-validator/check');

const booksController = require("../books/books.controller");
const booksFavorite = require("../books/books.favorite");
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/books', isAuth, booksController.getBooks);

router.get('/book/:bookId', isAuth, booksController.getBook);

router.post('/book', isAuth, booksController.createBook);

router.put('/book/:bookId', isAuth, booksController.updateBook);

router.delete('/book/:bookId', isAuth, booksController.deleteBook);

router.get('/books/favorite', isAuth, booksFavorite.getFavoriteBooks);

router.put('/book/favorite/:bookId', isAuth, booksFavorite.favoriteBook);

module.exports = router;