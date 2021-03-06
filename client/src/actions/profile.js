import axios from 'axios';
import { GET_PROFILE, GET_ERRORS, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER, GET_PROFILES } from './types';

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile').then(response => dispatch({
        type: GET_PROFILE,
        payload: response.data
    })).catch(
        error => dispatch({
            type: GET_PROFILE,
            payload: {}
        })
    );
};

export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile/all').then(response => dispatch({
        type: GET_PROFILES,
        payload: response.data
    })).catch(
        error => dispatch({
            type: GET_PROFILES,
            payload: null   // keep the reducer profile state to null
        })
    );
};

export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/profile/handle/${handle}`).then(response => dispatch({
        type: GET_PROFILE,
        payload: response.data
    })).catch(
        error => dispatch({
            type: GET_PROFILE,
            payload: null
        })
    );
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

export const addExperience = (exp, history) => dispatch => {
    axios.post('/api/profile/experience', exp)
        .then(response => history.push('/dashboard'))
        .catch(error => dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    );
};

export const addEducation = (edu, history) => dispatch => {
    axios.post('/api/profile/education', edu)
        .then(response => history.push('/dashboard'))
        .catch(error => dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    );
};

export const deleteExperience = (id) => dispatch => {
    axios.delete(`/api/profile/experience/${id}`)
        .then(response => dispatch({
            type: GET_PROFILE,
            payload: response.data
        }))
        .catch(error => dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    );
};

export const deleteEducation = (id) => dispatch => {
    axios.delete(`/api/profile/education/${id}`)
        .then(response => dispatch({
            type: GET_PROFILE,
            payload: response.data
        }))
        .catch(error => dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    );
};

// API deletes both profile and user
// the promise will then set the user to {} and the reducer sets the authentication to false
export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure?')) {
        axios.delete('/api/profile').then(response => dispatch ({
            type: SET_CURRENT_USER,
            payload: {}
        })).catch(error => dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        }));
    }
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