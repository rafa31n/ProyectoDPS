const express = require("express");

const respuesta = require('../../red/respuesta')
const controlador = require('./ingredientebiblio_controller');
const router = express.Router();

router.get('/:id', todos);
router.get('/uno/:id', uno);

async function uno(req, res, next){
    try{
        const items = await controlador.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    } 
};


async function todos(req, res, next){
    try{
        const items = await controlador.todos(req.params.id);
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    } 
};


module.exports = router;