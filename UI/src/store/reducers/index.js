import { combineReducers } from 'redux';
import BooksReducer from "../book/books.reducers";
import favoriteReducers from "../favorite-book/favorite.reducers";
import userReducers from "../user/user.reducers";

const rootReducer = combineReducers({
  book: BooksReducer,
  favorite: favoriteReducers,
  user: userReducers
});

export default rootReducer;
