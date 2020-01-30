import { alertConstants } from '../../constants';

export default function(state = {}, action) {
    switch (action.type) {
        case alertConstants.SUCCESS_FLASH:
            return {
                type: 'alert-success',
                message: action.message
            };
        case alertConstants.ERROR_FLASH:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case alertConstants.CLEAR_FLASH:
            return {};
        default:
            return state;
    }
}