import { LOGIN_USER, LOGOUT_USER, SIGN_UP_USER } from "./action";

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

const initialState = {
    id: (loggedInUser && loggedInUser.user) ? loggedInUser.user.id : '',
    email: (loggedInUser && loggedInUser.user) ? loggedInUser.user.email : '',
    token: loggedInUser ? loggedInUser.token : ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:{
            return {
                ...state,
                id: action.payload.user.id,
                email: action.payload.user.email,
                token: action.payload.token
            };
        }
        case SIGN_UP_USER:{
            return {
                ...state,
                id: action.payload.id,
                email: action.payload.email
            };
        }
        case LOGOUT_USER:{
            return {
                ...state,
                id: '',
                email: '',
                token: ''
            };
        }
        default:{
            return state;
        }
    }
}
