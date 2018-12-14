const fs = require('fs');
const path = require('path');
const mappings = require('./book-mappings');

const Book = require('./books.model');

exports.getFavoriteBooks = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 10;
    let totalItems;
    Book.find()
        .countDocuments()
        .then(count => {
            totalItems = count;
            return Book.find({favorite: true})
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

exports.favoriteBook = (req, res, next) => {
    let bookId = req.params.bookId;
    Book.findById(bookId)
        .then(book => {
            if (!book) {
                const error = new Error('Could not find book.');
                error.statusCode = 404;
                throw error;
            }
            book.favorite = req.body.favorite;
            return book.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Book favorite updated!', book: mappings.mapDbToBook(result) });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

