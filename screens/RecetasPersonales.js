import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconFA from "react-native-vector-icons/Ionicons";
import IconAD from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/Feather';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";

const RecipesScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [receta, setReceta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const abrirModal = (item) => {
    console.log(item)
    fetch("http://10.0.2.2:4000/api/recetas_personales/uno/" + item)
      .then((response) => response.json())
      .then((data) => {
        setReceta(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setLoading(false);
      });
    setEditModalVisible(true);
  };

  const editarReceta = (item) => {
    navigation.navigate('EditRecetaPersonal')
    AsyncStorage.setItem('idRecetaEditar', JSON.stringify(item));
  };

  const eliminarReceta = (item) => {
    setDeleteModalVisible(true);
    AsyncStorage.setItem('recetaPersonal', JSON.stringify(item));
  };

  const confirmarEliminar = () => {
    AsyncStorage.getItem('recetaPersonal')
      .then((data) => {
        if (data) {
          const postData = {
            id: data,
          }
          fetch('http://10.0.2.2:4000/api/recetas_personales', {
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
    setDeleteModalVisible(false);
  };

  const peticionFetch = () => {
    AsyncStorage.getItem('datosUsuario')
      .then((data) => {
        if (data) {
          const datos = JSON.parse(data);
          console.log(datos.userId)
          fetch("http://10.0.2.2:4000/api/recetas_personales/" + datos.userId)
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              setData(data);
              setLoading(false);
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
    peticionFetch()
  }, []);

  return (
    <View style={styles.componentContainer}>
      <Modal isVisible={editModalVisible}>
        <View style={styles.modalContainer}>
          {receta ? (
            <View style={styles.containerReceta}>
              {receta.body.map((item, index) => (
                <View key={index}>
                  <Text style={styles.tituloReceta}>{item.titulo}</Text>
                  <Text>Tiempo de comida: {item.tiempo_comida}</Text>
                  <Text>Duración: {item.duracion}</Text>
                  <Text>Preparación: {item.preparacion}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View>
              <Text>No hay elementos agregados.</Text>
            </View>
          )}
          <View style={styles.containerButtonsModal}>
            <TouchableOpacity
              style={styles.cancelarButton}
              onPress={() => {
                setEditModalVisible(false);
              }}>
              <Text>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal isVisible={deleteModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            ¿Desea eliminar esta receta personal?
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
                setDeleteModalVisible(false);
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
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.centerElement}>
            <Text style={styles.header}>Recetas personales</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.btnScreen} onPress={() => navigation.navigate("AddRecetaPersonal")}>
          <Text style={styles.btnScreenText}>Agregar receta personal</Text>
        </TouchableOpacity>
        {data ? (
          <View>
            {data.body.map((item, index) => (
              <View style={styles.container} key={index}>
                <View style={styles.contenido}>
                  <View>
                    <Text style={styles.tituloReceta}>{item.titulo}</Text>
                    <Text>Tiempo de comida: {item.tiempo_comida}</Text>
                    <Text>Duración: {item.duracion}</Text>
                  </View>
                </View>

                <View style={styles.contenido_icons}>
                  <TouchableOpacity
                    onPress={() => abrirModal(item.id)}>
                    <IconAD
                      style={styles.icon}
                      name="eye"
                      color="#c13145"
                      size={35}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => editarReceta(item.id)}>
                    <IconF
                      style={styles.icon}
                      name="edit"
                      color="#c13145"
                      size={35}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => eliminarReceta(item.id)}>
                    <IconAD
                      style={styles.icon}
                      name="delete"
                      color="#c13145"
                      size={35}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => agregarIngredientes(item.id)}>
                    <IconMCI
                      style={styles.icon}
                      name="food"
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
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  containerButtonsModal: {
    flexDirection: "row",
    width: '80%',
    justifyContent: "space-around",
    alignItems: "center",
  },
  containerReceta: {
    width: '100%',
    margin: 15,
  },
  confirmarButton: {
    backgroundColor: '#06BA63',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
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
  btnScreen: {
    backgroundColor: '#3C7A89',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    marginBottom: 0,
  },
  btnScreenText: {
    color: '#F0EFF4',
    fontSize: 16,
    textAlign: 'center',
  },
  contenido_icons: {
    flexDirection: "row",
    marginTop: 15,
    alignSelf: 'center',
  },
  tituloReceta: {
    fontWeight: "bold",
    fontSize: 16,
  },
  contenido: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
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
    textTransform: 'uppercase'
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