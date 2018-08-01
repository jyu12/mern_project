// the Root reducer where all other reducers are brought in here
import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';

export default combineReducers({
    authentication: authenticationReducer
});