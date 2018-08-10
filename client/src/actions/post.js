import axios from 'axios';

import { ADD_POST, GET_ERRORS, GET_POSTS, GET_POST, POST_LOADING, DELETE_POST, CLEAR_ERRORS } from './types'

export const setPostLoading = () => {
    return{
        type: POST_LOADING
    }
}

export const addPost = postData => dispatch => {
    dispatch(clearErrors());
    axios.post('/api/posts', postData)
        .then(response => dispatch({
            type: ADD_POST,
            payload: response.data 
        }))
        .catch(error => dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    );
}

export const getPosts = getData => dispatch => {
    dispatch(setPostLoading()); // while waiting to fetech data
    axios.get('/api/posts')
        .then(response => dispatch({
            type: GET_POSTS,
            payload: response.data 
        }))
        .catch(error => dispatch({
            type: GET_POSTS,    // get post again and return a empty, because data fields will not be used.
            payload: null
        })
    );
}

export const getPost = id => dispatch => {
    dispatch(setPostLoading());
    axios.get(`/api/posts/${id}`)
        .then(response => dispatch({
            type: GET_POST,
            payload: response.data 
        }))
        .catch(error => dispatch({
            type: GET_POSTS,    
            payload: null
        })
    );
}

export const deletePost = id => dispatch => {
    axios.delete(`/api/posts/${id}`)
        .then(response => dispatch({
            type: DELETE_POST,
            payload: id //send id. This is because reducer will need to delete the post locally 
        }))
        .catch(error => dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    );
}

export const like = (id) => dispatch => {
    axios.post(`/api/posts/like/${id}`)
        .then(response => dispatch(getPosts()))
        .catch(error => dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    );
}

export const unlike = id => dispatch => {
    axios.post(`/api/posts/unlike/${id}`)
        .then(response => dispatch(getPosts()))
        .catch(error => dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    );
}

export const addComment = (postId, comment) => dispatch => {
    dispatch(clearErrors());
    axios.post(`/api/posts/comment/${postId}`, comment)
        .then(response => dispatch({
            type: GET_POST,
            payload: response.data 
        }))
        .catch(error => dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    );
}

export const deleteComment = (postId, commentId) => dispatch => {
    axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(response => dispatch({
            type: GET_POST,
            payload: response.data 
        }))
        .catch(error => dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    );
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};


