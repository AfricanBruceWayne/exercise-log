import { authConstants } from '../../constants';
import { isEmpty } from '../../helpers';

const initialState = {
  isAuthenticated: false,
  user: {}
}

export function auth(state = initialState, action ) {
    switch (action.type) {
        case authConstants.LOGIN_SUCCESS:
          return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            user: action.payload
          };
        case authConstants.LOGIN_FAILURE:
        case authConstants.LOGOUT:
          return {};
        default:
          return state
      }
}