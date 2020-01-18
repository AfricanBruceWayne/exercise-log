import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from '../types';
import setAuthToken from '../setAuthToken';
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
              }, 3000)
        )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
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
              }, 3000)
        )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/');
    dispatch(alertActions.success('Logout successful'))
}