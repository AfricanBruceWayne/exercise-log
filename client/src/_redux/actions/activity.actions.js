import { activityConstants } from '../../_constants';
import { activityService } from '../../_services';
import { alertActions } from './';

export const activityActions = {
    getAll,
    add,
    delete: _delete
};

// Get all activities
function getAll () {
    
    return dispatch => {
        
        dispatch(request());
        activityService.getAll()
            .then(
                activities => dispatch(success(activities)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: activityConstants.GETALL_REQUEST } }
    function success(users) { return { type: activityConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: activityConstants.GETALL_FAILURE, error } }
};

// Add New Activity
function add(activity) {

    return dispatch => {

        dispatch(request(activity));

        activityService.register(activity)
            .then(
                activity => { 
                    dispatch(success(activity));
                    dispatch(alertActions.success('New Activity Added'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(activity) { return { type: activityConstants.REGISTER_REQUEST, activity } }
    function success(activity) { return { type: activityConstants.REGISTER_SUCCESS, activity } }
    function failure(error) { return { type: activityConstants.REGISTER_FAILURE, error } }
};

// Delete Activity
function _delete(id) {

    return dispatch => {
        dispatch(request(id));

        activityService.delete(id)
            .then(
                activity => { 
                    dispatch(success(id));
                    dispatch(alertActions.success('Activity deleted'))
                    setTimeout(() => {
                        dispatch(alertActions.clear());
                    }, 3000) 
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };
    
    function request(id) { return { type: activityConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: activityConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: activityConstants.DELETE_FAILURE, id, error } }

};