import axios from "axios";

// ENDPOINTS USUARIO
export const crearUsuario = async (data) => await axios.post('http://10.0.2.2:4000/usuario/crear', data);
export const loginUsuario = async (data) => await axios.post('http://10.0.2.2:4000/usuario/login', data);