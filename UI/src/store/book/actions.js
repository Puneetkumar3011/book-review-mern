import axios from 'axios';
import { API_BOOK_BASE_URL } from '../../shared/app.constants';

export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_BOOK = 'FETCH_BOOK';
export const CREATE_BOOK = 'CREATE_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';

export const fetchBooks = () => async dispatch => {
    const res = await axios.get(`${API_BOOK_BASE_URL}/books`);
    dispatch({
        type: FETCH_BOOKS,
        payload: res.data
    });
};

export const fetchBook = (id) => async dispatch => {
    const apiUrl = `${API_BOOK_BASE_URL}/book`;
    const res = await axios.get(`${apiUrl}/${id}`);
    dispatch({
        type: FETCH_BOOK,
        payload: res.data
    });
}

export function createNewBook(newBook) {
    const apiUrl = `${API_BOOK_BASE_URL}/book`;
    const request = axios.post(apiUrl, newBook);
    return {
        type: CREATE_BOOK,
        payload: request
    }
}

export function updateBook(book, id) {
    const apiUrl = `${API_BOOK_BASE_URL}/book/${id}`;
    const request = axios.put(apiUrl, book);
    return {
        type: UPDATE_BOOK,
        payload: request
    }
}
