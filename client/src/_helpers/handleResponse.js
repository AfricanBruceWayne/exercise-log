import { authService } from '../_services';

export function handleResponse(res) {
    return res.text().then(text => {
        const data = text && JSON.parse(text);
        if (!res.ok) 
        {
            if ([401, 403].indexOf(res.status) !== -1)
            {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authService.logout();
                location.reload(true);
            }

            const error = (data && data.message) || res.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}