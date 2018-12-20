import axios from 'axios';
import { store } from '../../store';

const instance = axios.create({
    baseURL: 'http://localhost:8085/book'
});

getInitialState();

store.subscribe(listener);

function selectToken(state) {
    return state.user.token;
}

function getInitialState() {
    let token = store.getState().user ? store.getState().user.token : '';
    let userId = store.getState().user ? store.getState().user.id : '';
    setHeader(token, userId);
}

function selectUserId(state) {
    return state.user.id;
}

function listener() {
    let token = selectToken(store.getState());
    let userId = selectUserId(store.getState());
    setHeader(token, userId);
}

function setHeader(token, userId) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios.defaults.headers.common['User'] = userId;
}

export default instance;