const initialState = {
    isAuthenticated = false,
    user: {}
}

export default function(state = initialState, action) {
    // action can be any data or payload
    // ex SET_CURRENT_USER: then return the modified state
    switch (action.type) {
        default:
            return state;
    }
}