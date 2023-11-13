const db = require('../../DB/mysql');

const TABLA = 'elementos_lista_recetas'

function todos(id_receta){
    return db.todos(TABLA, id_receta);
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
    eliminar,
    agregar,
    uno
}