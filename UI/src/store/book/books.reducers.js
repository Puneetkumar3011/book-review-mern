import { FETCH_BOOKS, FETCH_BOOK } from './actions';

const initialState = { books: [], bookInContext: null }
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKS:
            return {...state, books: action.payload.books};
        case FETCH_BOOK:
            return {...state, bookInContext: action.payload.book};
        default:
            return state
    }
}