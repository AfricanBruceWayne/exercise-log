import {
    GET_EXERCISES, GET_AN_EXERCISE,
    ADD_EXERCISE, UPDATE_EXERCISE, DELETE_EXERCISE,
    LOADING_DATA
} from '../types';

const initialState = {
    exercises = [],
    exercise = {}, 
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case GET_EXERCISES:
        return {
          ...state,
          exercises: action.payload,
          loading: false
        };
      case GET_AN_EXERCISE:
        return {
          ...state,
          exercise: action.payload
        };
      case DELETE_EXERCISE:
        index = state.exercises.findIndex(
          (exercise) => exercise.exerciseId === action.payload
        );
        state.exercises.splice(index, 1);
        return {
          ...state
        };
      case ADD_EXERCISE:
        return {
          ...state,
          exercises: [action.payload, ...state.exercises]
        };
      default:
        return state;
    }
  }