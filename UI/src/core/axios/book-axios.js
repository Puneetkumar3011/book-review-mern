import axios from 'axios';
import { store } from '../../store';

const instance = axios.create({
    baseURL: 'http://localhost:8085/book'
});

store.subscribe(listener);

function select(state) {
    return state.user.token;
}

function listener() {
    let token = select(store.getState());
    axios.defaults.headers.common['Authorization'] = 'Bearer ' +  token;
}

export default instance;