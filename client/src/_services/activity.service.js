import { authHeader } from '../_helpers';

export const activityService = {
    getAll,
    add,
    delete: _delete
};

function getAll() {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/activities', requestOptions)
        .then(handleResponse);
}

function add(activity) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity)
    };

    return fetch('/api/activities', requestOptions)
        .then(handleResponse);

}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/activities/' + id, requestOptions)
        .then(handleResponse);
}

function handleResponse(res) {
    if (!res.ok) { 
        return Promise.reject(res.statusText);
    }

    return res.json();
}