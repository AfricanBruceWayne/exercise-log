import { activityConstants } from '../../constants';

const initialState = {
  activities: [],
  loading: false
}

export function activity(state = initialState, action) {
  switch (action.type) {
    case activityConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case activityConstants.GETALL_SUCCESS:
      return {
        activities: action.activities
      };
    case activityConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case activityConstants.ADD_SUCCESS:
      return {
        ...state,
        activities: [action.payload, ...state.activities]
      };
    case activityConstants.DELETE_REQUEST:
    // add 'deleting:true' property to user being deleted
      return {
        ...state,
        activities: state.activities.map(activity =>
          activity.id === action.id
            ? { ...activity, deleting: true }
            : activity
        )
      };
      case activityConstants.DELETE_SUCCESS:
      // remove deleted user from state
        return {
          activities: state.activities.filter(activity => activity.id !== action.id)
        };
      case activityConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        return {
          ...state,
          activities: state.activities.map(activity => {
            if (activity.id === action.id) {
              // make copy of activity without 'deleting:true' property
              const { deleting, ...activityCopy } = activity;
              // return copy of activity with 'deleteError:[error]' property
              return { ...activityCopy, deleteError: action.error };
            }
  
            return activity;
          })
        };
    default:
      return state
  }
}