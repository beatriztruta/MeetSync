export const isValidValue = (value) => {
    return value !== undefined && value !== '' && value !== ' ' && value != null;
}

export const isValidTimesList = (list) => {
    if (!list) {
        return false;
    }

    return list.every(hour => 
        isValidValue(hour.date) && 
        isValidValue(hour.start) && 
        isValidValue(hour.end)
    );
};