import { isValidDateValue } from '@testing-library/user-event/dist/utils';

export const isValidValue = (value) => {
    return value !== undefined && value !== '' && value !== ' ' && value != null;
}

export const isValidTimesList = (list) => {
    if (!list) {
        return false;
    }

    return list.every(hour => 
        isValidDateValue(hour.date) && 
        isValidDateValue(hour.start) && 
        isValidDateValue(hour.end)
    );
};