import {
    GET_ACTIVITIES,
    ADD_ACTIVITY, DELETE_ACTIVITY,
    LOADING_DATA
} from '../types';

const initialState = {
    activities: [],
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
      case DELETE_ACTIVITY:
        return {
          ...state,
          activities: state.activities.filter(activity => activity._id !== action.payload)
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