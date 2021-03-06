import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES } from '../actions/types';


const initialState = {
    profile: null, 
    profiles: null,
    loading: false  // while fetching profile(s), so components can use this state for stuff like spinners
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PROFILES:
            return {
                ...state, // current states
                profiles: action.payload,   // fill with the payload
                loading: false
            };
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            };
        default:
            return state;
    }
}