const db = require('../DB/mysql');

const TABLA = 'ingrediente'

function todos(id_receta){
    return db.todos(TABLA, id_receta);
}

function agregar(body){
    return db.agregar(TABLA, body);
}

function eliminar(body){
    return db.eliminar(TABLA, body);
}

module.exports = {
    todos,
    eliminar,
    agregar
}