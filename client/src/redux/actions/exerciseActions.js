import axios from 'axios';
import {
    GET_EXERCISES, GET_AN_EXERCISE, ADD_EXERCISE, UPDATE_EXERCISE, DELETE_EXERCISE,
    LOADING_DATA, LOADING_UI, STOP_LOADING_UI,
    SET_ERRORS, CLEAR_ERRORS
} from '../types';

// Get all excercises
export const getExercises = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
        .get('/api/exercises')
        .then((res) => {
            dispatch({
                type: GET_EXERCISES,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: GET_EXERCISES,
                payload: []
            });
        });
};

// Get An Exercise
export const getAnExercise = (exerciseId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/api/exercises/${exerciseId}`)
        .then((res) => {
            dispatch({
                type: GET_AN_EXERCISE,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => console.log(err));
};

// Add New Exercise
export const addExercise = (newExercise) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/api/exercises', newExercise)
        .then((res) => {
            dispatch({
                type: ADD_EXERCISE,
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

// Delete An Exercise
export const deleteExercise = (exerciseId) => (dispatch) => {
    axios
        .delete(`/api/exercises/${exerciseId}`)
        .then(() => {
            dispatch({
                type: DELETE_EXERCISE,
                payload: exerciseId
            });
        })
        .catch((err) => console.log(err));
};

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};