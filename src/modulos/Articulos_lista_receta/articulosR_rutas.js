const express = require("express");

const respuesta = require('../../red/respuesta')
const controlador_articulo = require('./articulosR_controller');
const controlador_enlace_receta = require('./enlace_controller')
const router = express.Router();

router.get('/:id_lista', todos);
router.get('/uno/:id', uno);
router.post('/', agregar);
router.put('/', eliminar);
router.post('/mis_recetas', agregarReceta);
router.get('/lista/:id_lista', todasRecetas);
router.put('/mis_recetas', eliminarEnlace);


async function uno(req, res, next){
    try{
        const items = await controlador_articulo.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    } 
};


async function todasRecetas(req, res, next){
    try{
        const items = await controlador_enlace_receta.todos(req.params.id_lista);
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    } 
};

async function todos(req, res, next){
    try{
        const items = await controlador_articulo.todos(req.params.id_lista);
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    } 
};


async function agregar(req, res, next){
    try{
        console.log(req.body);
        await controlador_articulo.agregar(req.body);
        if(req.body.id == 0){
            mensaje = 'Articulo guardado con exito';
        }else{
            mensaje = 'Articulo actualizado con exito';
        }
        respuesta.success(req, res, mensaje, 200);
    }catch(err){
        next(err);
    } 
};

async function agregarReceta(req, res, next){
    try{
        console.log(req.body);
        await controlador_enlace_receta.agregar(req.body);
        if(req.body.id == 0){
            mensaje = 'Receta guardada en lista con exito';
        }else{
            mensaje = 'Receta actualizada en lista con exito';
        }
        respuesta.success(req, res, mensaje, 200);
    }catch(err){
        next(err);
    } 
};


async function eliminar(req, res, next){
    try{
        console.log(req.body);
        await controlador_articulo.eliminar(req.body);
        respuesta.success(req, res, "Articulo eliminardo correctamente", 200);
    }catch(err){
        next(err);
    } 
};

async function eliminarEnlace(req, res, next){
    try{
        console.log(req.body);
        await controlador_enlace_receta.eliminar(req.body);
        respuesta.success(req, res, "Articulo eliminardo correctamente", 200);
    }catch(err){
        next(err);
    } 
};


module.exports = router;