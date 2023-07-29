const SET_ACCOUNT = 'SET_ACCOUNT';
const LOGOUT = 'LOGOUT';

const defaultState = {
    currentAccount: {},
    isAuth: false
}

export default function accountReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_ACCOUNT:
            return {
                ...state,
                currentAccount: action.payload,
                isAuth: true
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                currentAccount: {},
                isAuth: false
            }
        default:
            return state;
    }
}

export const setAccount = account => ({ type: SET_ACCOUNT, payload: account });
export const logout = () => ({type: LOGOUT});
