import axios from 'axios'

export const authService = {
    registerUser,
    loginUser,
    logoutUser
};

function registerUser(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    axios.post('/api/users/register', requestOptions)
        .then(handleResponse);
}

function loginUser(email, password) {
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    axios.post('/api/users/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logoutUser() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(res) {
    if (!res.ok) { 
        return Promise.reject(res.statusText);
    }

    return res.json();
}