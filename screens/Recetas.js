import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import IconFA from "react-native-vector-icons/Ionicons";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
//import { agregarReceta } from "../src/api/api";

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
        /*const loginUser = await agregarReceta(data);
        if (loginUser.data.status == 200) {
          alert('Receta agregada')
        } else {
          alert('Credenciales incorrectas.');
        }*/
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    }
  }


  return (
    <View style={styles.componentContainer}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.leftElement}>
            <TouchableOpacity
              style={styles.buttonLogin}
              onPress={() => navigation.navigate("Home")}
            >
              <IconFA
                style={styles.icon}
                name="arrow-back-circle"
                color="#fff"
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.centerElement}>
            <Text style={styles.header}>Mis recetas</Text>
          </View>
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

          <TouchableOpacity style={styles.btnAgregar} onPress={agregarRecetas}>
            <Text style={styles.textBtnRegistrarse} >Agregar Receta</Text>
          </TouchableOpacity>          
        </View>


      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  componentContainer: {
    flex: 1,
    backgroundColor: '#e5f2fa'
  },
  buttonLogin: {
    marginTop: 10
  },
  headerContainer: {
    backgroundColor: "#006294",
    flexDirection: "row",
  },
  leftElement: {
    marginLeft: 16,
    marginRight: 25,
    marginTop: 8,
  },
  centerElement: {
    marginBottom: 20,
  },
  icon: {
    marginHorizontal: 5,
  },
  scroll: {
    backgroundColor: "#e5f2fa",
    height: "100%",
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
    paddingTop: 16,
    color: "#fff",
  },
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
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    borderRadius: 15,
    color: '#000',
    margin: 5,
  },
  container_body: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAgregar: {
    backgroundColor: '#229CFF',
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 6
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
  },
  containerInputs: {
    justifyContent: 'center', // Centrado vertical
    alignItems: 'center',
    marginTop: 30,
  },
  container_title: {
    backgroundColor: '#006294',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingBottom: 20
  }
});
export default RecipesScreen;