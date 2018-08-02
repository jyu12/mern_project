// Add authentication token to every request if logined in
import axios from 'axios';

const setAuthenticationToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthenticationToken;