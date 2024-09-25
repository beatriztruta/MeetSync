export const isValidValue = (value) => {
    return value !== undefined && value !== '' && value !== ' ' && value != null;
}

export const isValidTimesList = (list) => {
    if (!list || list.length === 0) {
        return false;
    }

    return list.every(hour => 
        isValidValue(hour.date) && 
        isValidValue(hour.start) && 
        isValidValue(hour.end)
    );
};

export function createLink(idRoom) {
    return `${window.location.origin}/sala-votacao/${idRoom}`;
}