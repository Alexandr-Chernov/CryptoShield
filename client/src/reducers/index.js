import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import accountReducer from './accountReducer';
import padAccountReducer from './padAccountReducer';


const rootReducer = combineReducers({
    account: accountReducer,
    padAccount: padAccountReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
