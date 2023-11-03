import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import IconFA from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Fontisto";
import { useNavigation } from "@react-navigation/native";

const BibliotecaScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisibleEliminar, setModalVisibleEliminar] = useState(false);
  const [modalVisibleFavorito, setModalVisibleFavorito] = useState(false);

  useEffect(() => {
    fetch("http://10.0.2.2:4000/api/recetas")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setLoading(false);
      });
  }, []);

  function eliminar(id){
    alert('Eliminado');
    setModalVisibleEliminar(!modalVisibleEliminar);
  }

  function agregar(){
    alert('Agregado')
    setModalVisibleFavorito(!modalVisibleFavorito);
    
  }

  return (
    <View>

      
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisibleEliminar}
      >
        <View style={styles.modal}>
          <View style={styles.vista_modal}>
            <Text style={styles.nombre}>Desea eliminar esta receta?</Text>
            <View style={styles.contenido_icons}>
              <TouchableOpacity style={styles.button_elim} onPress={eliminar}>
                <Text style={styles.button_text}>Eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button_can}
                onPress={() => {
                  setModalVisibleEliminar(!modalVisibleEliminar);
                }}
              >
                <Text style={styles.button_text}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisibleFavorito}
      >
        <View style={styles.modal}>
          <View style={styles.vista_modal}>
            <Text style={styles.nombre}>Desea agregar a favoritos?</Text>
            <View style={styles.contenido_icons}>
              <TouchableOpacity style={styles.button_elim} onPress={agregar}>
                <Text style={styles.button_text}>Agregar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button_can}
                onPress={() => {
                  setModalVisibleFavorito(!modalVisibleFavorito);
                }}
              >
                <Text style={styles.button_text}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
            <Text style={styles.header}>Biblioteca de recetas</Text>
          </View>
        </View>

        <View style={styles.scroll}>
          {data && data.error === false && (
            <View>
              {data.body.map((item) => (
                <View style={styles.container} key={item.id}>
                  <Image
                    style={styles.imagen}
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/3565/3565418.png",
                    }}
                  />
                  <View style={styles.contenido}>
                    <View>
                      <Text style={styles.tituloReceta}>{item.titulo}</Text>
                      <Text>Tiempo de comida: {item.tiempo_comida}</Text>
                      <Text>Duración: {item.duracion}</Text>
                      <Text>Preparación: {item.preparacion}</Text>
                    </View>
                  </View>
                  <View style={styles.contenido_icons}>
                    <TouchableOpacity onPress={() => {setModalVisibleFavorito(!modalVisibleFavorito)}}>
                      <Icon
                        style={styles.icon}
                        name="favorite"
                        color="#c13145"
                        size={25}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} onPress={() => {setModalVisibleEliminar(!modalVisibleEliminar)}}>
                      <Icon
                        style={styles.icon}
                        name="trash"
                        color="#c13145"
                        size={25}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  header: {
    fontWeight: "bold",
    fontSize: 24,
    paddingTop: 16,
    color: "#fff",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  contenido: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "center",
  },
  tituloReceta: {
    fontWeight: "bold",
    fontSize: 16,
  },
  icon: {
    marginHorizontal: 5,
  },
  scroll: {
    backgroundColor: "#e5f2fa",
    height: "100%",
  },
  contenido_icons: {
    flexDirection: "row",
    marginTop: 10,
    alignSelf: "flex-end",
  },
  modal:{
    backgroundColor: '#000000aa',
    flex: 1
  },
  vista_modal:{
    backgroundColor: '#fff',
    marginVertical: '83%',
    marginHorizontal: '10%',
    padding: 20,
    borderRadius: 10,
    flex: 1
  },
  button_can:{
    height: 30,
    width: 70,
    marginVertical: 10
  },
  button_elim:{
    height: 30,
    width: 70,
    marginVertical: 10,
    marginRight: 10
  },
  button_text:{
    color: '#005FAC',
    fontWeight: 'bold'
  },
  buttonLogin:{
    marginTop: 10
  }
});

export default BibliotecaScreen;
