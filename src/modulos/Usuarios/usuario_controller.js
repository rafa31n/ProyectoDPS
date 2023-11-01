const db = require('../../DB/mysql');

const TABLA = 'usuario'

function login(body){
    return db.login(TABLA, body);
}

function uno(body){
    return db.uno(TABLA, body);
}

function agregar(body){
    return db.agregar(TABLA, body);
}

function eliminar(body){
    return db.eliminar(TABLA, body);
}

module.exports = {
    login,
    agregar,
    uno,
    eliminar,
}