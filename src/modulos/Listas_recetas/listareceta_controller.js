const db = require('../../DB/mysql');

const TABLA = 'listas_receta'

function todos(id){
    return db.todos(TABLA, id);
}

function uno(id){
    return db.uno(TABLA, id);
}

function agregar(body){
    return db.agregar(TABLA, body);
}

function eliminar(body){
    return db.eliminar(TABLA, body);
}

module.exports = {
    todos,
    uno,
    eliminar,
    agregar
}