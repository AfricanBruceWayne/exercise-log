import { activityConstants } from '../../constants';

const initialState = {
    activities: [],
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
      case activityConstants.GET_ACTIVITIES:
        return {
          ...state,
          activities: action.payload,
          loading: false
        };
      case activityConstants.DELETE_ACTIVITY:
        return {
          ...state,
          activities: state.activities.filter(activity => activity._id !== action.payload)
        };
      case activityConstants.ADD_ACTIVITY:
        return {
          ...state,
          activities: [action.payload, ...state.activities]
        };
      case activityConstants.LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }