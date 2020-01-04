import {
    GET_ACTIVITIES, GET_AN_ACTIVITY,
    ADD_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY,
    LOADING_DATA
} from '../types';

const initialState = {
    activities = [],
    activity = {}, 
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case GET_ACTIVITIES:
        return {
          ...state,
          activities: action.payload,
          loading: false
        };
      case GET_AN_ACTIVITY:
        return {
          ...state,
          activity: action.payload
        };
      case DELETE_ACTIVITY:
        index = state.activities.findIndex(
          (activity) => activity.activityId === action.payload
        );
        state.activities.splice(index, 1);
        return {
          ...state
        };
      case ADD_ACTIVITY:
        return {
          ...state,
          activities: [action.payload, ...state.activities]
        };
      default:
        return state;
    }
  }