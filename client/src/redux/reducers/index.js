import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { auth } from './auth.reducer';
import { activity } from './activity.reducer';
import { registration } from './registration.reducer'

const rootReducer = combineReducers({
    activity,
    alert,
    auth,
    registration
});

export default rootReducer;