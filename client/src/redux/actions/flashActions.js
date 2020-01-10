import { FLASH_MESSAGE } from '../types';

export default flashActions = (message, class_name) => {

    return {
        type: FLASH_MESSAGE,
        payload: {
            message,
            class_name
        }
    }
};