const express = require("express");

const respuesta = require('../../red/respuesta')
const controlador = require('./listarpersonal_controller');
const router = express.Router();

router.get('/:id', todos);
router.get('/uno/:id', uno);
router.post('/', agregar);
router.put('/', eliminar);


async function todos(req, res, next){
    try{
        const items = await controlador.todos(req.params.id);
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    } 
};

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
            mensaje = 'Lista guardada con exito';
        }else{
            mensaje = 'Lista actualizada con exito';
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
        respuesta.success(req, res, "Lista eliminarda correctamente", 200);
    }catch(err){
        next(err);
    } 
};

module.exports = router;