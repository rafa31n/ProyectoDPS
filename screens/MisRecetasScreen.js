import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal
} from "react-native";
import IconFA from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const MisRecetasScreen = () => {

  const navigation = useNavigation();
  const [modalVisibleEliminar, setModalVisibleEliminar] = useState(false);

  function eliminar() {
    alert("Eliminado");
    setModalVisibleEliminar(!modalVisibleEliminar);
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

      <View style={styles.container_title}>
        <Text style={styles.header}>Recetas favoritas</Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.imagen}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3565/3565418.png",
            }}
          />

          <View style={styles.contenido}>
            <Text style={styles.nombre}>Nombre receta</Text>
            <Text>Tiempo de comida:</Text>
            <Text>Duracion:</Text>
            <Text>Preparación:</Text>
            <Text style={styles.descripcion}>Descripcion:</Text>
          </View>

          <View style={styles.contenido_icons}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Modificar");
              }}
            >
              <IconFA
                name="build-outline"
                color="#c13145"
                size={25}
                style={styles.icons}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisibleEliminar(!modalVisibleEliminar);
              }}
            >
              <IconFA name="trash-outline" color="#c13145" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  container_title: {
    backgroundColor: "#006294",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "center",
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  contenido: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "left",
  },
  contenido_icons: {
    flexDirection: "row",
    marginTop: 10,
    alignSelf: "flex-end",
  },
  descripcion: {
    fontSize: 14,
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
    color: "#FFFFFF",
  },
  icons: {
    marginLeft: 15,
    marginRight: 15,
  },
  body: {
    backgroundColor: "#CFFFFD",
    flex: 1,
  },
  modal: {
    backgroundColor: "#000000aa",
    flex: 1,
  },
  vista_modal: {
    backgroundColor: "#fff",
    marginVertical: "83%",
    marginHorizontal: "10%",
    padding: 20,
    borderRadius: 10,
    flex: 1,
  },
  button_can: {
    height: 30,
    width: 70,
    marginVertical: 10,
  },
  button_elim: {
    height: 30,
    width: 70,
    marginVertical: 10,
    marginRight: 10,
  },
  button_text: {
    color: "#005FAC",
    fontWeight: "bold",
  },
});

export default MisRecetasScreen;
