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

function todos(tabla, id){
    if(id != null){
        if(id == 0){
            return "no hay receta seleccionada";
        }else{
            return new Promise((resolve, reject) => {
                conexion.query(`SELECT * FROM ${tabla} WHERE id_foraneo = ${id}`, (error, result) => {
                    return error ? reject(error): resolve(result);
                })
            })
        }
    }else{
        return new Promise((resolve, reject) => {
            conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
                return error ? reject(error): resolve(result);
            })
        })
    }  
}

function uno(tabla, id){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id = ${id}`, (error, result) => {
            return error ? reject(error): resolve(result);
        })
    })
}

function agregar(tabla, data){
    if(data && data.id == 0){
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
        conexion.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [data, data.id] ,(error, result) => {
            return error ? reject(error): resolve(result);
        })
    });
}

function eliminar(tabla, data){
    return new Promise((resolve, reject) => {
        const espacio = "id" + tabla;
        conexion.query(`DELETE FROM ${tabla} WHERE id = ?`, data.id,(error, result) => {
            return error ? reject(error): resolve(result);
        })
    });
}

function login(tabla, data){
    return new Promise((resolve, reject) => {
        data.contrasena = sha256(data.contrasena)
        conexion.query(`SELECT id FROM ${tabla} WHERE username = ? AND contrasena = ?`,[data.username, data.contrasena] ,(error, result) => {
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