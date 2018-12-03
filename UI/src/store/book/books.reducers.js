import {
    FETCH_BOOKS, GET_BOOKS, FETCH_BOOK, GET_BOOK,
    CREATE_BOOK, UPDATE_BOOK, DELETE_BOOK
} from './actions';

const initialState = { books: [], bookInContext: null }
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKS:
            return {
                ...state,
                books: action.payload
            };

        case FETCH_BOOK:
            return {
                ...state,
                bookInContext: action.payload
            };

        case GET_BOOKS: return state;

        case GET_BOOK: {
            let filteredBook = null;
            state.books.forEach(book => {
                if(book.id === action.payload){
                    filteredBook = {...book};
                }
            });
            return {
                ...state,
                bookInContext: filteredBook
            };
        }

        case CREATE_BOOK: {
            return {
                ...state,
                books: [...state.books, action.payload.book]
            }
        }

        case UPDATE_BOOK: {
            let newBooks =  [...state.books];
            newBooks = newBooks.map((book) => {
                return (book.id === action.payload.id) ? Object.assign({}, book, action.payload) : book;
            });
            return {
                ...state,
                books: newBooks
            };
        }

        case DELETE_BOOK: {
            let newBooks =  [...state.books];
            newBooks = newBooks.filter((book) => {
                return book.id !== action.payload;
            });
            return {
                ...state,
                books: newBooks
            };
        }

        default:
            return state
    }
}