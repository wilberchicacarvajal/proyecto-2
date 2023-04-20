// encargado de acceder a la base de datos

export function getDatabase(dbName) {
    const database = JSON.parse(localStorage.getItem(dbName));
    return database === null ? [] : database;
}

export function setDatabase(dbName, JsonData) {
    localStorage.setItem(dbName, JSON.stringify(JsonData));
}
