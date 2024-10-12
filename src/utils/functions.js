const base62chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const isValidValue = (value) => {
    return value !== undefined && value !== "" && value !== " " && value != null;
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

export function hasDuplicate(times) {
  return times.some((time, index) => 
    times.findIndex(t => 
      t.date === time.date && 
      t.start === time.start && 
      t.end === time.end
    ) !== index
  );
}

export function idToHash(number) {
  let encoded = "";
  while (number > 0) {
    let remainder = number % 62;
    encoded = base62chars[remainder] + encoded;
    number = Math.floor(number / 62);
  }
  return encoded;
}

export function hashToId(encoded) {
  let decoded = 0;
  for (let i = 0; i < encoded.length; i++) {
    decoded = decoded * 62 + base62chars.indexOf(encoded[i]);
  }
  return decoded;
}
