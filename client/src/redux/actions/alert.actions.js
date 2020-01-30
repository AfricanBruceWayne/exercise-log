import { alertConstants } from '../../constants';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return {
        type: alertConstants.SUCCESS_FLASH,
        message
    }
}

function error(message) {
    return {
        type: alertConstants.ERROR_FLASH,
        message
    }
}

function clear() {
    return {
        type: alertConstants.CLEAR_FLASH
    }
}