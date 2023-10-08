const mysql = require('mysql');
const config = require('../config');
const sha256 = require('sha256');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let conexion;

function conectar(){
    conexion = mysql.createConnection(dbconfig);
    conexion.connect((err) => {
        if(err){
            console.log(err)
            setTimeout(conectar, 200)
        }else{
            console.log('Base de datos conectada!!')
        }
    });

    conexion.on('error', err => {
        console.log(err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conectar();
        }else{
            throw err;
        }
    })
}

conectar();

function todos(tabla){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            return error ? reject(error): resolve(result);
        })
    })
}

function uno(tabla, id){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id_${tabla}=${id}`, (error, result) => {
            return error ? reject(error): resolve(result);
        })
    })
}

function agregar(tabla, data){
    if(data && (data.id_receta == 0 || data.id_usuario == 0)){
        return insertar(tabla, data);
    }else{
        return actualizar(tabla, data);
    }
}

function insertar(tabla, data){
    return new Promise((resolve, reject) => {
        if(data.contrasena){
            data.contrasena = sha256(data.contrasena);
        }
        conexion.query(`INSERT INTO ${tabla} SET ? `, data ,(error, result) => {
            return error ? reject(error): resolve(result);
        })
    });
}
function actualizar(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE id_${tabla} = ?`, [data, data.id_receta] ,(error, result) => {
            return error ? reject(error): resolve(result);
        })
    });
}

function eliminar(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id_${tabla} = ?`, data.id_receta,(error, result) => {
            return error ? reject(error): resolve(result);
        })
    });
}

function login(tabla, data){
    return new Promise((resolve, reject) => {
        data.contrasena = sha256(data.contrasena)
        conexion.query(`SELECT id_${tabla} FROM ${tabla} WHERE username = ? AND contrasena = ?`,[data.username, data.contrasena] ,(error, result) => {
            return error ? reject(error): resolve(result);
        })
    })
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    login
}