import { FETCH_FAVORITE_BOOKS } from "./actions";

const initialState = { books: [], bookInContext: null }
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FAVORITE_BOOKS: {
            return {
                ...state,
                books: action.payload
            };
        }
        default: {
            return state;
        }
    }
}