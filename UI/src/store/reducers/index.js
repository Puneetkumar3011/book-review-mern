import { combineReducers } from 'redux';
import BooksReducer from "../book/books.reducers";
import favoriteReducers from "../favorite-book/favorite.reducers";

const rootReducer = combineReducers({
  book: BooksReducer,
  favorite: favoriteReducers
});

export default rootReducer;
