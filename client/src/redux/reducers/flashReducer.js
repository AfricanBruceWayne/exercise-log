import { FLASH_MESSAGE } from '../types';

const initialState = {
    message: null,
    class_name: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FLASH_MESSAGE:
            return action.payload;
        default:
            return state;
    }
};