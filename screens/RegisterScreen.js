import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import IconAD from 'react-native-vector-icons/AntDesign';
import { crearUsuario } from '../src/api/api.js';

const RegisterScreen = () => {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const navigation = useNavigation();
  const registrarse = async () => {
    if (contrasena == confirmarContrasena && contrasena.length > 0) {
      const nombre = nombres.split(' ');
      const apellido = apellidos.split(' ');

      const postData = {
        id: 0,
        primer_nombre: nombre[0],
        segundo_nombre: nombre[1],
        primer_apellido: apellido[0],
        segundo_apellido: apellido[1],
        username: usuario,
        contrasena: contrasena,
        correo: correo
      }

      fetch('http://10.0.2.2:4000/api/usuario/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error en la solicitud POST');
          }
        })
        .then(data => {
          if (data.status === 200) {
            alert("El usuario ha sido creado con éxito.")
            navigation.navigate('Login');
          }
        })
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
          alert('Error al realizar la solicitud.')
        });
    } else {
      alert("Las contraseñas no coinciden. Revisa los datos.")
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_body}>

        <View style={styles.inputContainer}>
          <IconAD style={styles.icon}
            name='idcard' color='#fff' size={20} />
          <TextInput placeholderTextColor="#FFF"
            style={styles.input}
            placeholder="Nombres"
            onChangeText={(text) => setNombres(text)}
            value={nombres}
          />
        </View>

        <View style={styles.inputContainer}>
          <IconAD style={styles.icon}
            name='idcard' color='#fff' size={20} />
          <TextInput placeholderTextColor="#FFF"
            style={styles.input}
            placeholder="Apellidos"
            onChangeText={(text) => setApellidos(text)}
            value={apellidos}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon style={styles.icon}
            name='person' color='#fff' />
          <TextInput placeholderTextColor="#FFF"
            style={styles.input}
            placeholder="Usuario"
            onChangeText={(text) => setUsuario(text)}
            value={usuario}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon style={styles.icon} name="mail" color='#fff' />
          <TextInput placeholderTextColor="#FFF"
            style={styles.input}
            placeholder="Correo"
            onChangeText={(text) => setCorreo(text)}
            value={correo}
          />
        </View>

        <View style={styles.inputContainer}>
          {/* div de la contraseña1*/}
          <Icon style={styles.icon} name="lock" color='#fff' />
          <TextInput placeholderTextColor="#FFF"
            style={styles.input}
            secureTextEntry={true}
            placeholder="Contraseña"
            onChangeText={(text) => setContrasena(text)}
            value={contrasena}
          />
        </View>

        <View style={styles.inputContainer}>
          {/* div de la contraseña2*/}
          <Icon style={styles.icon} name="lock" color='#fff' />

          <TextInput placeholderTextColor="#FFF"
            style={styles.input}
            secureTextEntry={true}
            placeholder="Confirmar contraseña"
            onChangeText={(text) => setConfirmarContrasena(text)}
            value={confirmarContrasena}
          />
        </View>

        <TouchableOpacity onPress={registrarse} style={styles.buttonRegistrarse}>
          <Text style={styles.textBtnRegistrarse} >Registrarse</Text>
        </TouchableOpacity>

        <Text style={styles.text}>¿Ya tienes cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.textBtnLogin}>Inicia Sesión </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    backgroundColor: '#006294',
  },
  inputContainer: {
    flexDirection: "row",
    borderColor: "#000",
    paddingBottom: 10,
  },
  input: {
    width: "60%",
    borderWidth: 1,
    borderColor: "#fff",
    padding: 5,
    flex: 0.9,
    color: '#fff',
    borderRadius: 15,
  },
  container_body: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRegistrarse: {
    backgroundColor: '#c13145',
    width: 300,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 0,
    color: '#fff',
  },
  buttonLogin: {
    backgroundColor: '#006294',
    width: 300,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textBtnLogin: {
    textAlign: 'center',
    marginTop: 0,
    color: '#fff',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  textBtnRegistrarse: {
    textAlign: 'center',
    marginTop: 0,
    color: '#fff',

  }, icon: {
    padding: 10,
  },
});
export default RegisterScreen;
