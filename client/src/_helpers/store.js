import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../redux/reducers';

const initialState = {};

const middleWare = [thunk];

const composeEnhancers = 
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) 
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleWare));

export const store = createStore(
    rootReducer,
    initialState, 
    enhancer
);
