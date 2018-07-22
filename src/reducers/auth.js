import { SET_USER, AUTH_INITIALIZED } from "../actions/auth.js";

const auth = (state = {}, action) => {
    switch (action.type) {
        case AUTH_INITIALIZED:
            return {
                ...state,
                initialized: true
            };
        case SET_USER:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
};

export default auth;
