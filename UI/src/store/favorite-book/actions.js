import axios from 'axios';
import { API_BOOK_BASE_URL } from '../../shared/app.constants';

export const FETCH_FAVORITE_BOOKS = 'FETCH_FAVORITE_BOOKS';

export const fetchFavoriteBooks = () => async dispatch => {
    const response = await axios.get(`${API_BOOK_BASE_URL}/books/favorite`);
    dispatch({
        type: FETCH_FAVORITE_BOOKS,
        payload: response.data.books
    });
};


