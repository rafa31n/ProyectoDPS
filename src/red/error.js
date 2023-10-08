const respuesta = require('./respuesta');

function errors(err, req, res, next){
    console.error('[error', err);
    const mensaje = err.mensaje || 'Error interno';
    const status = err.status || 500;

    respuesta.error(req, res, mensaje, status);
}

module.exports = errors;