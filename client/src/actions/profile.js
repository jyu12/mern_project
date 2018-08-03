import axios from 'axios';
import { GET_PROFILE, GET_ERRORS, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile').then(response => dispatch({
        type: GET_PROFILE,
        payload: response.data
    })).catch(error => dispatch({
        type: GET_PROFILE,
        payload: {}
    }));
};

// history is needed for redirect
export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profile', profileData)
        .then(response => history.push('/dashboard'))
        .catch(error => 
            dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    );
};

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};