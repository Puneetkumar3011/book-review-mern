import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import BooksReducer from "../book/books.reducers";

const rootReducer = combineReducers({
  book: BooksReducer
});

export default rootReducer;
