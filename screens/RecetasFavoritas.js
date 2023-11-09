import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import IconFA from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import IconOC from "react-native-vector-icons/Octicons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const MisRecetasScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [idRecetasArreglo, setIdRecetasArreglo] = useState([]);

  const eliminarReceta = (item) => {
    const idReceta = idRecetasArreglo[item];
    setEditModalVisible(true);
    AsyncStorage.setItem('recetaFavoritaElim', JSON.stringify(idReceta));
  };

  const confirmarEliminar = () => {
    AsyncStorage.getItem('recetaFavoritaElim')
      .then((data) => {
        if (data) {
          const postData = {
            id: data,
          }
          fetch('http://10.0.2.2:4000/api/recetas_biblioteca', {
            method: 'PUT',
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
              console.log(data)
              if (data.status === 200) {
                peticionFetch();
              }
            })
            .catch(error => {
              console.error('Error al realizar la solicitud:', error);
              alert('Error al realizar la solicitud.')
            });
        }
      })
      .catch((error) => {
        console.error('Error al recuperar datos de AsyncStorage:', error);
      });
    setEditModalVisible(false);
  };

  const peticionFetch = () => {
    const fetchPromises = [];
    AsyncStorage.getItem('datosUsuario')
      .then((data) => {
        if (data) {
          const datos = JSON.parse(data);
          fetch("http://10.0.2.2:4000/api/recetas_biblioteca/mis_recetas/" + datos.userId)
            .then((response) => response.json())
            .then((data) => {
              if (data.body[0]) {
                const bodyArray = data.body;
                const cantidadDeObjetos = bodyArray.length;
                for (let i = 0; i < cantidadDeObjetos; i++) {
                  const idReceta = data.body[i].id;
                  setIdRecetasArreglo((prevIds) => [...prevIds, idReceta]);
                  const promise = fetch("http://10.0.2.2:4000/api/recetas_biblioteca/" + data.body[i].id_receta_biblio)
                    .then((response) => response.json())
                    .then((jsonData) => jsonData.body)
                    .catch((error) => {
                      console.error('Error en la solicitud:', error);
                      return [];
                    });
                  fetchPromises.push(promise);
                }
                Promise.all(fetchPromises)
                  .then((results) => {
                    // Concatena los resultados en un solo array
                    const concatenatedData = results.flat();
                    setData(concatenatedData);
                  })
                  .catch((error) => {
                    console.error('Error al obtener datos:', error);
                  });
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
  }

  useEffect(() => {
    peticionFetch();
  }, []);

  return (
    <View style={styles.componentContainer}>
      <Modal isVisible={editModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            ¿Desea eliminar esta receta de favoritos?
          </Text>
          <View style={styles.containerButtonsModal}>
            <TouchableOpacity
              style={styles.confirmarButton}
              onPress={() => {
                confirmarEliminar();
              }}
            >
              <Text>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelarButton}
              onPress={() => {
                setEditModalVisible(false);
              }}
            >
              <Text>Cancelar</Text>
            </TouchableOpacity>
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
                size={35}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.centerElement}>
            <Text style={styles.header}>Recetas favoritas</Text>
          </View>
        </View>

        <View style={styles.scroll}>
          {data ? (
            <View>
              {data.map((item, index) => (
                <View style={styles.container} key={index}>
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
                      onPress={() => eliminarReceta(index)}>
                      <IconOC
                        style={styles.icon}
                        name="repo-deleted"
                        color="#c13145"
                        size={35}
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
  confirmarButton: {
    backgroundColor: '#06BA63',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  containerButtonsModal: {
    flexDirection: "row",
    width: '80%',
    justifyContent: "space-around",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  cancelarButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  tituloReceta: {
    fontWeight: "bold",
    fontSize: 16,
  },
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
    textTransform: 'uppercase',
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
