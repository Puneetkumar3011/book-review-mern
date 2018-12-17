import { LOGIN_USER, LOGOUT_USER, SIGN_UP_USER } from "./action";
const initialState = {
    name: '',
    email: '',
    token: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:{
            return {
                ...state,
                name: action.payload.user.name,
                email: action.payload.user.email,
                token: action.payload.token
            };
        }
        case SIGN_UP_USER:{
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email
            };
        }
        case LOGOUT_USER:{
            return {
                ...state,
                name: '',
                email: '',
                token: ''
            };
        }
        default:{
            return state;
        }
    }
}
