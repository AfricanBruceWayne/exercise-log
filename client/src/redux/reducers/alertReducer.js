import {
    SUCCESS_FLASH,
    ERROR_FLASH,
    CLEAR_FLASH
} from '../types';

export default function alert(state = {}, action) {
    switch (action.type) {
        case SUCCESS_FLASH:
            return {
                type: 'alert-success',
                message: action.message
            };
        case ERROR_FLASH:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case CLEAR_FLASH:
            return {};
        default:
            return state;
    }
}