import axios from 'axios';
import {
    GET_ACTIVITIES, GET_AN_ACTIVITY, ADD_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY,
    LOADING_DATA, LOADING_UI, STOP_LOADING_UI,
    SET_ERRORS, CLEAR_ERRORS
} from '../types';

// Get all activities
export const getActivities = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
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

// Get An Activity
export const getAnActivity = (activityId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/api/activities/${activityId}`)
        .then((res) => {
            dispatch({
                type: GET_AN_ACTIVITY,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
};

// Add New Activity
export const addActivity = (newActivity) => (dispatch) => {
    dispatch({ type: LOADING_UI });
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
export const deleteActivity = (activityId) => (dispatch) => {
    axios
        .delete(`/api/activities/${activityId}`)
        .then(() => {
            dispatch({
                type: DELETE_ACTIVITY,
                payload: activityId
            });
        })
        .catch((err) => console.log(err));
};

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};