const Book = require('./books.model');

exports.mapDbToBooks = (dbBooks) => {
    const bookList = [];
    dbBooks.forEach(dbBook => {
        bookList.push(fromDbToModelBook(dbBook));
    });
    return bookList;
}

exports.mapDbToBook = (dbBook) => {
    return fromDbToModelBook(dbBook);
}

fromDbToModelBook = (dbBook) => {
    let bookModel = {};
    bookModel.id = dbBook._id;
    bookModel.title = dbBook.title;
    bookModel.desription = dbBook.desription;
    bookModel.imageUrl = dbBook.imageUrl;
    bookModel.author = dbBook.author;
    bookModel.price = dbBook.price;
    return bookModel;
}