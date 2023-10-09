import axios from "axios";

// ENDPOINTS USUARIO
export const crearUsuario = async (data) => await axios.post('http://10.0.2.2:4000/api/usuario/registro', data);
export const loginUsuario = async (data) => await axios.post('http://10.0.2.2:4000/api/usuario/login', data);

export const verInfoUsuario = async (data) => await axios.get('http://10.0.2.2:4000/api/usuario/' + data);
export const actualizarInfoUsuario = async (data) => await axios.post('http://10.0.2.2:4000/api/usuario/registro', data);

export const agregarReceta = async (data) => await axios.post('http://10.0.2.2:4000/api/recetas', data);
export const bibliotecaRecetas = async (data) => await axios.get('http://10.0.2.2:4000/api/recetas');
