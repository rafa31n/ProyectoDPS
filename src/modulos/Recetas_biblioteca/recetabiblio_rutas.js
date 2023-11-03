const express = require("express");

const respuesta = require('../../red/respuesta')
const controlador_receta = require('./recetabiblio_controller');
const controlador_fav = require('./favoritos_controller');
const router = express.Router();

router.get('/', todos_biblioteca);
router.get('/:id', uno_biblioteca);
router.get('/mis_recetas/:id', todos_usuario);
router.post('/', agregar_fav);
router.put('/', eliminar_fav);


async function todos_biblioteca(req, res, next){
    try{
        const items = await controlador_receta.todos();
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    } 
};

async function todos_usuario(req, res, next){
    try{
        const items = await controlador_fav.todos(req.params.id);
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    } 
};

async function uno_biblioteca(req, res, next){
    try{
        const items = await controlador_receta.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    } 
};

async function agregar_fav(req, res, next){
    try{
        console.log(req.body);
        await controlador_fav.agregar(req.body);
        if(req.body.id == 0){
            mensaje = 'Añadido a favoritos';
        }else{
            mensaje = 'Error';
        }
        respuesta.success(req, res, mensaje, 200);
    }catch(err){
        next(err);
    } 
};

async function eliminar_fav(req, res, next){
    try{
        console.log(req.body);
        await controlador_fav.eliminar(req.body);
        respuesta.success(req, res, "Receta eliminada de favoritos", 200);
    }catch(err){
        next(err);
    } 
};

module.exports = router;