const SET_DATA = 'SET_DATA';

const defaultState = {
    data: {}
}

export default function padAccountReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}

export const setPadAccount = padAccount => ({ type: SET_DATA, payload: padAccount });
