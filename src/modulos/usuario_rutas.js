const express = require("express");

const respuesta = require('../red/respuesta')
const controlador = require('./usuario_controller');
const router = express.Router();

router.get('/:id', uno);
router.post('/login', login);
router.post('/registro', agregar);
router.put('/', eliminar);



async function uno(req, res, next){
    try{
        const items = await controlador.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    } 
};

async function agregar(req, res, next){
    try{
        console.log(req.body);
        await controlador.agregar(req.body);
        if(req.body.id == 0){
            mensaje = 'Usuario guardado con exito';
        }else{
            mensaje = 'Usuario actualizado con exito';
        }
        respuesta.success(req, res, mensaje, 200);
    }catch(err){
        next(err);
    } 
};

async function eliminar(req, res, next){
    try{
        console.log(req.body);
        await controlador.eliminar(req.body);
        respuesta.success(req, res, "Usuario eliminardo correctamente", 200);
    }catch(err){
        next(err);
    } 
};

async function login(req, res, next){
    try{
        const id = await controlador.login(req.body);
        respuesta.success(req, res, id, 200);
    }catch(err){
        next(err);
    } 
};

module.exports = router;