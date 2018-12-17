import axiosInstance from '../../core/axios/user-axios';

export const SIGN_UP_USER = 'SIGN_UP_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const signUpUser = (user) => async dispatch => {
    let response = await axiosInstance.post('/signup', user);
    dispatch({
        type: SIGN_UP_USER,
        payload: response.data.user
    });
}

export const loginUser = (user) => async dispatch => {
    const response = await axiosInstance.post('/login', user);
    dispatch({
        type: LOGIN_USER,
        payload: response.data
    });
}

export const logoutUser = (user) => async dispatch => {
    const response = await axiosInstance.post('/user', user);
    dispatch({
        type: LOGOUT_USER,
        payload: response.data.user
    });
}
