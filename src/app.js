const express = require('express');
const morgan = require('morgan');
const config = require('./config.js');

const recetas_personales = require('./modulos/Recetas_personales/receta_rutas.js')
const usuarios = require('./modulos/Usuarios/usuario_rutas.js')
const ingredientes_personales = require('./modulos/Ingredientes_personales/ingrediente_rutas.js')
const error = require('./red/error.js')

const app = express();

//Middleware Express
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Configuration
app.set('port', config.app.port)

//Rutes
app.use('/api/recetas_personales', recetas_personales)
app.use('/api/usuario', usuarios)
app.use('/api/ingrediente_personales', ingredientes_personales)
app.use(error);


module.exports = app;