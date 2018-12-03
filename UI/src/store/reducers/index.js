import { combineReducers } from 'redux';
import BooksReducer from "../book/books.reducers";

const rootReducer = combineReducers({
  book: BooksReducer
});

export default rootReducer;
