import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { authConstants, userConstants } from '../../constants';
import { alertActions } from './alert.actions';
import { history, setAuthToken } from '../../helpers';

export const registerUser = (user) => dispatch => {
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    axios.post('/api/users/register', requestOptions) 
        .then(handleResponse)
        .then(
            user => {
                
                    dispatch(success(user));
                    history.push('/');
                    dispatch(alertActions.success('Registration successful'));
                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 3000)
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
                setTimeout(() => {
                    dispatch(alertActions.clear());
                }, 5000)
            }
        );

    function request(user) { return { type: userConstants.REGISTER_FAILURE, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(user) { return { type: userConstants.REGISTER_FAILURE, user } }
}

export const loginUser = (email, password) => dispatch => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    axios.post('/api/users/login', requestOptions)
    .then(handleResponse)
        .then(res => {
                    const { token } = res.data;
                    storeAuthInfo(token, dispatch);
                    history.push('/');
                    dispatch(alertActions.success('Login Successful'))
                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 3000)
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
                setTimeout(() => {
                    dispatch(alertActions.clear());
                }, 5000)
            }
        )

    function request(user) { return { type: authConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

export const logoutUser = () => dispatch => {
        // remove user from local storage to log user out
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        dispatch({ type: authConstants.LOGOUT });
        dispatch(alertActions.success('Logout successful'))
}

export const setCurrentUser = decoded => {
    return { 
        type: authConstants.LOGIN_SUCCESS,
        payload: decoded
    }
}

// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
const storeAuthInfo = (authToken, dispatch) => {
    localStorage.setItem('jwtToken', authToken)
    setAuthToken(authToken);
    const decoded = jwt_decode(authToken);
    dispatch(setCurrentUser(decoded));
}

function handleResponse(res) 
{
    return res.text().then(text => {
        const data = text && JSON.parse(text);
        if (!res.ok) 
        {
            if (res.status === 401)
            {
                // auto logout if 401 response returned from api
                logoutUser();
            }
            
            const error = ( data && data.message) || res.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}