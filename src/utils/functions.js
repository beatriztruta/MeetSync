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

export function validacaoEmail(field) {
  const usuario = field.substring(0, field.indexOf("@"));
  const dominio = field.substring(field.indexOf("@")+ 1, field.length);
  
  if ((usuario.length >=1) &&
      (dominio.length >=3) &&
      (usuario.search("@") === -1) &&
      (dominio.search("@") === -1) &&
      (usuario.search(" ") === -1) &&
      (dominio.search(" ") === -1) &&
      (dominio.search(".") !== -1) &&
      (dominio.indexOf(".") >= 1)&&
      (dominio.lastIndexOf(".") < dominio.length - 1)) {
        return true;
  }
  else {
    return false;
  }
}