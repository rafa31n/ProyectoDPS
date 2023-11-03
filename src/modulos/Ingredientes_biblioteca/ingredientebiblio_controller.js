const db = require('../../DB/mysql');

const TABLA = 'ingredientes_biblioteca'

function todos(id){
    return db.todos(TABLA, id);
}

function uno(id){
    return db.uno(TABLA, id);
}


module.exports = {
    todos,
    uno
}