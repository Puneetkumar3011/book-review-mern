const fs = require('fs');
const path = require('path');
const mappings = require('./book-mappings');

const { validationResult } = require('express-validator/check');

const Book = require('./books.model');

exports.getBooks = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 10;
    let totalItems;
    Book.find()
        .countDocuments()
        .then(count => {
            totalItems = count;
            return Book.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage);
        })
        .then(books => {
            res.status(200)
                .json({
                    message: 'Fetched books successfully.',
                    books: mappings.mapDbToBooks(books),
                    totalItems: totalItems
                });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getBook = (req, res, next) => {
    const bookId = req.params.bookId;
    Book.findById(bookId)
        .then(book => {
            if (!book) {
                const error = new Error('Could not find book.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Book fetched.',
                book: mappings.mapDbToBook(book)
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.createBook = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const book = new Book({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.file.path,
        author: req.body.author,
        price: req.body.price,
        favorite: req.body.favorite,
        creator: { name: 'Puneet' }
    });
    book.save()
        .then(result => {
            res.status(201).json({
                message: 'Book created successfully!',
                book: mappings.mapDbToBook(result)
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateBook = (req, res, next) => {
    const bookId = req.params.bookId;
    let imageUrl = req.body.imageUrl;
    if (req.file) {
        imageUrl = req.file.path;
    }
    if (!imageUrl) {
        const error = new Error('No file picked.');
        error.statusCode = 422;
        throw error;
    }
    Book.findById(bookId)
        .then(book => {
            if (!book) {
                const error = new Error('Could not find book.');
                error.statusCode = 404;
                throw error;
            }
            if (imageUrl !== book.imageUrl) {
                clearImage(book.imageUrl);
            }
            book.title = req.body.title;
            book.description = req.body.description;
            book.imageUrl = imageUrl;
            book.author = req.body.author;
            book.price = req.body.price;
            book.favorite = req.body.favorite;
            return book.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Book updated!', book: mappings.mapDbToBook(result) });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteBook = (req, res, next) => {
    const bookId = req.params.bookId;
    Book.findById(bookId)
        .then(book => {
            if (!book) {
                const error = new Error('Could not find book.');
                error.statusCode = 404;
                throw error;
            }
            // Check logged in user
            clearImage(book.imageUrl);
            return Book.findByIdAndRemove(bookId);
        })
        .then(result => {
            console.log(result);
            res.status(200).json({ message: 'Deleted book.', bookId: bookId });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};
