import { StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { agregarReceta } from "../src/api/api";

const RecipesScreen = () => {
  const navigation = useNavigation();
  const [titulo, setTitulo] = useState("");
  const [tiempoComida, settiempoComida] = useState("");
  const [duracion, setduracion] = useState("");
  const [preparacion, setPreparacion] = useState("");

  const agregarRecetas = async () => {
    if (titulo.length > 0 && tiempoComida.length > 0 && duracion.length > 0 && preparacion.length > 0) {
      try {
        const data = {
          id: 0,
          titulo: titulo,
          tiempo_comida: tiempoComida,
          duracion: duracion,
          preparacion: preparacion,
          imagen: "imagen.jpg",
          id_usuario: 0,
        }
        const loginUser = await agregarReceta(data);
        if (loginUser.data.status == 200) {
          alert('Receta agregada')
        } else {
          alert('Credenciales incorrectas.');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    }
  }


  return (
    <View>
      <View>
        <View style={styles.container_title}>
          <Text style={styles.headerText}>Información de la receta</Text>
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

          <TouchableOpacity style={styles.buttonRegistrarse} onPress={agregarRecetas}>
            <Text style={styles.textBtnRegistrarse} >Agregar Receta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRegistrarse} onPress={() => navigation.navigate('AgregarIngredientes')}>
            <Text style={styles.textBtnRegistrarse} >Agregar lista de compras</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRegistrarse} onPress={() => navigation.navigate('AgregarIngredientes')}>
            <Text style={styles.textBtnRegistrarse} >Agregar ingredientes</Text>
          </TouchableOpacity>
        </View>


      </View>
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
    textAlign: 'center',
    color: 'white'
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
    marginTop: 6
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
    borderBottomRightRadius: 15,
    paddingBottom: 20
  }
});
export default RecipesScreen;