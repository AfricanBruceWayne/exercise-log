import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/authReducer';
import activityReducer from './reducers/dataReducer';

const initialState = {};

const middleWare = [thunk];

const reducers = combineReducers({
    user: userReducer,
    data: activityReducer
});

const composeEnhancers = 
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) 
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleWare));
const store = createStore(reducers, initialState, enhancer);

export default store;