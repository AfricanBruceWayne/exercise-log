import axios from 'axios';
import {
    GET_ACTIVITIES, ADD_ACTIVITY, DELETE_ACTIVITY,
    SET_ERRORS, CLEAR_ERRORS
} from '../types';

import { alertActions } from './alertActions';

// Get all activities
export const getActivities = () => (dispatch) => {
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
            dispatch(alertActions.success('New activity added'));
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
            dispatch(alertActions.success('Activity Deleted'))
        })
        .catch((err) => console.log(err));
};

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};