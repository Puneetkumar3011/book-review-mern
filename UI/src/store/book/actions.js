import axios from 'axios';
import { API_BOOK_BASE_URL } from '../../shared/app.constants';

export const FETCH_BOOKS = 'FETCH_BOOKS';
export const GET_BOOKS = 'GET_BOOKS';
export const FETCH_BOOK = 'FETCH_BOOK';
export const GET_BOOK = 'GET_BOOK';
export const CREATE_BOOK = 'CREATE_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';

export const fetchBooks = () => async dispatch => {
    const response = await axios.get(`${API_BOOK_BASE_URL}/books`);
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
    const apiUrl = `${API_BOOK_BASE_URL}/book`;
    const response = await axios.get(`${apiUrl}/${id}`);
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
    const apiUrl = `${API_BOOK_BASE_URL}/book`;
    const response = await axios.post(apiUrl, newBook);
    dispatch({
        type: CREATE_BOOK,
        payload: response.data
    });
}

export const updateBook = (book, id) => async dispatch => {
    const apiUrl = `${API_BOOK_BASE_URL}/book/${id}`;
    const response = await axios.put(apiUrl, book);
    dispatch({
        type: UPDATE_BOOK,
        payload: response.data.book
    });
}

export const deleteBook = (book) => async dispatch => {
    const apiUrl = `${API_BOOK_BASE_URL}/book/${book.id}`;
    const response = await axios.delete(apiUrl);
    dispatch({
        type: DELETE_BOOK,
        payload: response.data.bookId
    });

}
