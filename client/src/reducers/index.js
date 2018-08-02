// the Root reducer where all other reducers are brought in here
import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    authentication: authenticationReducer,
    errors: errorReducer
});
