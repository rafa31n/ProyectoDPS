import { BackHandler, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { agregarReceta } from "../src/api/api";


const ModificarReceta = () => {

  const [titulo, setTitulo] = useState("");
  const [tiempoComida, settiempoComida] = useState("");
  const [duracion, setduracion] = useState("");
  const [preparacion, setPreparacion] = useState("");

  const agregarRecetas = async () => {
    if (titulo.length > 0 && tiempoComida.length > 0 && duracion.length > 0 && preparacion.length > 0) {
      try {
        const data = {
          id: 14, //Aqui iria el cambio de id, aun no esta funcional, 
          titulo: titulo,
          tiempo_comida: tiempoComida,
          duracion: duracion,
          preparacion: preparacion,
          imagen: "imagen.jpg",
          id_usuario: 0,
        }
        const loginUser = await agregarReceta(data);
        if (loginUser.data.status == 200) {
          alert('Receta modificada')
        } else {
          alert('Credenciales incorrectas.');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    }
  }

return(
    <View>
        <View style={styles.container_title}>
            <Text style={styles.header}>Modificar Receta</Text>
        </View>

        <View style={styles.containerInputs}>
          <TextInput
            style={styles.input}
            placeholder="Titulo receta"
            onChangeText={(text) => setTitulo(text)}
            value={titulo}
            placeholderTextColor="#000"
          />
          <TextInput
            style={styles.input}
            placeholder="Tiempo comida"
            onChangeText={(text) => settiempoComida(text)}
            value={tiempoComida}
            placeholderTextColor="#000"
          />
          <TextInput
            style={styles.input}
            placeholder="Duracion"
            onChangeText={(text) => setduracion(text)}
            value={duracion}
            placeholderTextColor="#000"
          />
          <TextInput
            style={styles.input}
            placeholder="Preparacion"
            onChangeText={(text) => setPreparacion(text)}
            value={preparacion}
            placeholderTextColor="#000"
          />

        </View>

        <TouchableOpacity style={styles.buttonRegistrarse} onPress={agregarRecetas}>
            <Text style={styles.textBtnRegistrarse} >Modificar Receta</Text>
        </TouchableOpacity>
    </View>

);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 30,
      textAlign: 'center'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 24,
        paddingLeft: 16,
        paddingTop: 16,
        paddingBottom: 16,
        color: '#FFFFFF'
    },
    inputContainer: {
      flexDirection: "row",
      borderColor: "#000",
      paddingBottom: 10,
    },
    input: {
      width: '90%',
      borderWidth: 1,
      borderColor: '#000',
      padding: 5,
      borderRadius: 15,
      color: '#000',
      margin: 15,
    },
    container_body: {
      width: '100%',
      height: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonRegistrarse: {
      backgroundColor: '#229CFF',
      width: '90%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 6,
      alignSelf: 'center'
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
      color: 'black',
  
    }, icon: {
      padding: 10,
    },
    containerInputs: {
      justifyContent: 'center', // Centrado vertical
      alignItems: 'center',
    },
    container_title:{
        backgroundColor: '#006294',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    }
  });

export default ModificarReceta;