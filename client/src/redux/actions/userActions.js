import axios from 'axios';
import { authConstants } from '../../constants';
import { setAuthToken } from '../../helpers';
import jwt_decode from 'jwt-decode';

import { alertActions } from './alertActions';

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/users/register', user)
        .then(
            res => history.push('/'),
            dispatch(alertActions.success('Registeration successful'))
        )
        .then(
            setTimeout(() => {
                dispatch(alertActions.clear());
              }, 1500)
        )
        .catch(err => {
            dispatch({
                type: authConstants.GET_ERRORS,
                payload: err.response.data
            })
            
        });
}

export const loginUser = (user) => dispatch => {
    axios.post('/api/users/login', user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            dispatch(alertActions.success('Login Successful'))
        })
        .then(
            setTimeout(() => {
                dispatch(alertActions.clear());
              }, 2500)
        )
        .catch(err => {
            dispatch({
                type: authConstants.GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const setCurrentUser = decoded => {
    return {
        type: authConstants.SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/');
    dispatch(alertActions.success('Logout successful'))
    setTimeout(() => {
        dispatch(alertActions.clear());
    }, 1500)
}