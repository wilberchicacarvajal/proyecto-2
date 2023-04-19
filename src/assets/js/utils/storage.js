// encargado de acceder a la base de datos
export function getDatabase(){
    return localStorage.getItem('db_teachers');
}

export function setDatabase(teachers) {
    localStorage.setItem('db_teachers', teachers);
}
