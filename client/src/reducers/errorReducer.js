import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
};

export default function(state = initialState, action) {
    // action can be any data or payload from the action
    switch (action.type) {
        case CLEAR_ERRORS:
            return {};
        case GET_ERRORS:
            return action.payload;  // payload will include the error object from server
        default:
            return state;
    }
}