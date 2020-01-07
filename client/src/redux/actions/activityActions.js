import axios from 'axios';
import {
    GET_ACTIVITIES, ADD_ACTIVITY, DELETE_ACTIVITY,
    LOADING_DATA,
    SET_ERRORS, CLEAR_ERRORS
} from '../types';

// Get all activities
export const getActivities = () => (dispatch) => {
    dispatch(setActivitiesLoading());
    axios
        .get('/api/activities')
        .then((res) => {
            dispatch({
                type: GET_ACTIVITIES,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: GET_ACTIVITIES,
                payload: []
            });
        });
};

// Add New Activity
export const addActivity = (newActivity) => (dispatch, getState) => {
    axios
        .post('/api/activities', newActivity)
        .then((res) => {
            dispatch({
                type: ADD_ACTIVITY,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

// Delete Activity
export const deleteActivity = (activityId) => (dispatch, getState) => {
    axios
        .delete(`/api/activities/${activityId}`)
        .then(res => {
            dispatch({
                type: DELETE_ACTIVITY,
                payload: activityId
            });
        })
        .catch((err) => console.log(err));
};

export const setActivitiesLoading = () => {
    return {
        type: LOADING_DATA
    };
};

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};