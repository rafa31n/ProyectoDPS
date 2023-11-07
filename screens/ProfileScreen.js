import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import { verInfoUsuario, actualizarInfoUsuario } from '../src/api/api.js';
import { useRoute } from '@react-navigation/native';

const ProfileScreen = () => {
  const route = useRoute();
  const userId = route.params?.userId;

  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');

  const actualizarInfo = async () => {
    if (nombres.length > 0 && apellidos.length > 0 && usuario.length > 0 && correo.length > 0) {
      const nombre = nombres.split(' ');
      const apellido = apellidos.split(' ');
      try {
        const data = {
          id: userId,
          primer_nombre: nombre[0],
          segundo_nombre: nombre[1],
          primer_apellido: apellido[0],
          segundo_apellido: apellido[1],
          username: usuario,
          correo: correo
        }
        /*const loginUser = await actualizarInfoUsuario(data);
        if (loginUser.data.status == 200) {
          alert('Informacion actualizada correctamente')
          cargarInfoUsuario();
        } else {
          alert('No se pudo actualizar la informacion de usuario.');
        }*/
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    }
  };

  const cargarInfoUsuario = async () => {
    try {
      const infoUsuario = await verInfoUsuario(userId);
      setNombres(infoUsuario.data.body[0].primer_nombre + ' ' + infoUsuario.data.body[0].segundo_nombre)
      setApellidos(infoUsuario.data.body[0].primer_apellido + ' ' + infoUsuario.data.body[0].segundo_apellido)
      setUsuario(infoUsuario.data.body[0].username)
      setCorreo(infoUsuario.data.body[0].correo)

    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  useEffect(() => {
    cargarInfoUsuario();
  }, []);
  return (
    <View style={styles.container}>
      <Icon style={styles.icon}
        name='account' color='#000' size={200} />
      <TouchableOpacity style={styles.buttonsphoto} onPress={cargarInfoUsuario}>
        <Text>Cambiar foto de perfil</Text>
      </TouchableOpacity>

      <Text style={styles.email}>Nombre de usuario:</Text>
      <TextInput style={styles.txtInput}
        onChangeText={(text) => setUsuario(text)} value={usuario}></TextInput>

      <Text style={styles.email}>Nombres:</Text>
      <TextInput style={styles.txtInput}
        onChangeText={(text) => setNombres(text)} value={nombres}></TextInput>

      <Text style={styles.email}>Apellidos:</Text>
      <TextInput style={styles.txtInput}
        onChangeText={(text) => setApellidos(text)} value={apellidos}></TextInput>

      <Text style={styles.email}>Correo electronico:</Text>
      <TextInput style={styles.txtInput}
        onChangeText={(text) => setCorreo(text)} value={correo}></TextInput>


      <TouchableOpacity style={styles.btnCambiarInfo} onPress={actualizarInfo}>
        <Text>Actualizar información</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonsphoto: {
    backgroundColor: '#80bfff',
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
  btnCambiarInfo: {
    backgroundColor: '#70B77E',
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    color: '#fff',
    margin: 15,
  },
  txtInput: {
    width: '60%',
    borderWidth: 1,
    borderColor: '#272727',
    padding: 5,
    marginBottom: 2,
    borderRadius: 15,
    color: '#000',
  }
});

export default ProfileScreen;