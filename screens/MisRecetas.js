import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import IconFA from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Fontisto";
import AsyncStorage from '@react-native-async-storage/async-storage';

const MisRecetasScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [datosUsuario, setDatosUsuario] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('datosUsuario')
      .then((data) => {
        if (data) {
          const datos = JSON.parse(data);
          fetch("http://10.0.2.2:4000/api/recetas_biblioteca/mis_recetas/" + datos.userId)
            .then((response) => response.json())
            .then((data) => {
              if (data.body[0]) {
                for (let i = 0; i < 2; i++) {
                  fetch("http://10.0.2.2:4000/api/recetas_biblioteca/" + data.body[i].id_receta_biblio)
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data.body)
                      //setData(data)
                      //setLoading(false);
                    })
                    .catch((error) => {
                      console.error("Error al obtener los datos:", error);
                      setLoading(false);
                    });
                }
              }
            })
            .catch((error) => {
              console.error("Error al obtener los datos:", error);
              setLoading(false);
            });
        }
      })
      .catch((error) => {
        console.error('Error al recuperar datos de AsyncStorage:', error);
      });
  }, []);

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

        <View style={styles.scroll}>

          {data ? (
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
                    <TouchableOpacity
                      onPress={() => abrirModal(item.id)}>
                      <Icon
                        style={styles.icon}
                        name="favorite"
                        color="#c13145"
                        size={25}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.containerBody}>
              <Text>No hay elementos agregados a favoritos.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  componentContainer: {
    flex: 1,
    backgroundColor: '#e5f2fa'
  },
  containerBody: {
    padding: 15,
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
    paddingTop: 16,
    color: "#fff",
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
