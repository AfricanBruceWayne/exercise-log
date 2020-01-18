import {
    SUCCESS_FLASH,
    ERROR_FLASH,
    CLEAR_FLASH
} from '../types';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return {
        type: SUCCESS_FLASH,
        message
    }
}

function error(message) {
    return {
        type: ERROR_FLASH,
        message
    }
}

function clear() {
    return {
        type: CLEAR_FLASH
    }
}