const express = require('express');
const morgan = require('morgan');
const config = require('./config.js');

const recetas = require('./modulos/receta_rutas.js')
const usuarios = require('./modulos/usuario_rutas.js')
const error = require('./red/error.js')

const app = express();

//Middleware Express
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Configuration
app.set('port', config.app.port)

//Rutes
app.use('/api/recetas', recetas)
app.use('/api/usuario', usuarios)
app.use(error);


module.exports = app;