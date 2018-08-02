import axios from 'axios';
import setAuthenticationToken from '../util/setAuthenticationToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, } from './types';

// Action creator - Register user 
// userData passed in will be dispatched along to reducer
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
         .then(result => history.push('/login'))
         .catch(error => 
            dispatch({  // Thunk: ajax call and waiting for the payload, so dispatch is called. So it doesn't just return.
                type: GET_ERRORS,
                payload: error.response.data
            })
        );
    /* to dispatch something to reducer, just return obj with type
    return {
        // must contain a type
        type: GET_ERRORS,
        payload: userData
    }
    */
};

// Login, server is JWT so that needs to be decoded
export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
         .then(response => {
             // save token 
             const { token } = response.data;
             localStorage.setItem('jwtToken', token);

             // Uses axios to fillin header for every request if logged in
             setAuthenticationToken(token);
             const decoded = jwt_decode(token);

             dispatch(setCurrentUser(decoded));
         })
         .catch(error => dispatch({
            type: GET_ERRORS,
            payload: error.response.data
         }))
};

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};