import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
const RegisterScreen = () => {
  const [correo, setCorreo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const navigation = useNavigation();
  const checkPass=()=>{
    if (contrasena==confirmarContrasena && contrasena.length>0) {
        alert("LAS CONTRSSEÑAS so ibguale")
    }else{
        alert("Credenciales incorrectas")
    }
  }
  return (
    <View style={styles.container}>
      {/* cuerpo del formulario*/}
      <View style={styles.container_body}>
        <View style={styles.inputContainer}>
          {/* div del usuario*/}
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
          {/* div del correo*/}
          <Icon style={styles.icon} name="mail"  color='#fff'/>
          <TextInput placeholderTextColor="#FFF"
            style={styles.input}
            placeholder="Correo"
            onChangeText={(text) => setCorreo(text)}
            value={correo}
          />
        </View>
        <View style={styles.inputContainer}>
          {/* div de la contraseña1*/}
          <Icon style={styles.icon} name="lock"  color='#fff'/>
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
          <Icon style={styles.icon} name="lock"  color='#fff'/>

          <TextInput placeholderTextColor="#FFF"
            style={styles.input}
            secureTextEntry={true}
            placeholder="Confirmar contraseña"
            onChangeText={(text) => setConfirmarContrasena(text)}
            value={confirmarContrasena}
          />
        </View>
        <TouchableOpacity  onPress={checkPass} style={styles.buttonRegistrarse}>
          <Text style={styles.textBtnRegistrarse} >Registrarse</Text>
        </TouchableOpacity>
        <Text style={styles.text}>¿Ya tienes cuenta?</Text>
        <TouchableOpacity  onPress={() => navigation.navigate("Login")}>
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
    
    borderRadius: 15,
  }, container_body: {
    width: '100%',
    height: '50%',
   
   
    justifyContent: 'center',
    alignItems: 'center',
},buttonRegistrarse: {
    backgroundColor: '#c13145',
    width: 300,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
}, text: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 0,
    color: '#fff',
}, buttonLogin: {
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
  
},icon: {
  padding: 10,
},
});
export default RegisterScreen;
