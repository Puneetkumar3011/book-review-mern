import axiosInstance from '../../core/axios/book-axios';

export const FETCH_BOOKS = 'FETCH_BOOKS';
export const GET_BOOKS = 'GET_BOOKS';
export const FETCH_BOOK = 'FETCH_BOOK';
export const GET_BOOK = 'GET_BOOK';
export const CREATE_BOOK = 'CREATE_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const FAVORITE_BOOK = 'FAVORITE_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';

export const fetchBooks = () => async dispatch => {
    const response = await axiosInstance.get(`/books`);
    dispatch({
        type: FETCH_BOOKS,
        payload: response.data.books
    });
};

export const getBooks = () => {
    return{
        type: GET_BOOKS
    }
};

export const fetchBook = (id) => async dispatch => {
    const response = await axiosInstance.get('/book');
    dispatch({
        type: FETCH_BOOK,
        payload: response.data.book
    });
}

export const getBook = (id) => {
    return{
        type: GET_BOOK,
        payload: id
    }
}

export const createNewBook = (newBook) => async dispatch => {
    const response = await axiosInstance.post('/book', newBook);
    dispatch({
        type: CREATE_BOOK,
        payload: response.data
    });
}

export const updateBook = (book, id) => async dispatch => {
    const apiUrl = `/book/${id}`;
    const response = await axiosInstance.put(apiUrl, book);
    dispatch({
        type: UPDATE_BOOK,
        payload: response.data.book
    });
}

export const deleteBook = (book) => async dispatch => {
    const apiUrl = `/book/${book.id}`;
    const response = await axiosInstance.delete(apiUrl);
    dispatch({
        type: DELETE_BOOK,
        payload: response.data.bookId
    });
}

export const favoriteBook = (book) => async dispatch => {
    const apiUrl = `/book/favorite/${book.id}`;
    const response = await axiosInstance.put(apiUrl, book);
    dispatch({
        type: FAVORITE_BOOK,
        payload: response.data.book
    });
}

