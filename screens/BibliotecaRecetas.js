import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import IconFA from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Fontisto";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";

const BibliotecaScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    fetch("http://10.0.2.2:4000/api/recetas_biblioteca")
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

  const abrirModal = (item) => {
    setEditModalVisible(true);
    AsyncStorage.setItem('recetaFavorita', JSON.stringify(item));
  };

  const confirmarAgregar = () => {
    AsyncStorage.getItem('recetaFavorita')
      .then((data) => {
        if (data) {
          // Obtener id del usuario logueado
          AsyncStorage.getItem('datosUsuario')
            .then((data) => {
              if (data) {
                const datos = JSON.parse(data);
                setDatosUsuario(datos);
              }
            })
            .catch((error) => {
              console.error('Error al recuperar datos de AsyncStorage:', error);
            });
          // Agregar receta a favoritos
          const postData = {
            id: 0,
            id_receta_biblio: data,
            id_foraneo: datosUsuario.userId
          }

          fetch('http://10.0.2.2:4000/api/recetas_biblioteca', {
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
              console.log(data)
              if (data.status == 200) {
                alert('La receta ha sido agregada a favoritos correctamente.');
              } else {
                alert('No se pudo completar la petición. Vuelve a intentarlo');
              }
            })
            .catch(error => {
              console.error('Error al realizar la solicitud:', error);
              alert('Error al realizar la solicitud.')
            });
        }else{
          alert('Error al realizar la solicitud.')
        }
      })
      .catch((error) => {
        console.error('Error al recuperar datos de AsyncStorage:', error);
      });
    setEditModalVisible(false);
  };

  return (
    <View style={styles.componentContainer}>
      <Modal isVisible={editModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            ¿Desea guardar esta receta a favoritos?
          </Text>
          <View style={styles.containerButtonsModal}>
            <TouchableOpacity
              style={styles.confirmarButton}
              onPress={() => {
                confirmarAgregar();
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
            <Text style={styles.header}>Biblioteca de recetas</Text>
          </View>
        </View>

        <View style={styles.scroll}>
          <TouchableOpacity style={styles.btnScreen} onPress={() => navigation.navigate("MisRecetas")}>
            <Text style={styles.btnScreenText}>Ver mis resetas favoritas</Text>
          </TouchableOpacity>
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
                    <TouchableOpacity
                      onPress={() => abrirModal(item.id)}>
                      <Icon
                        style={styles.icon}
                        name="favorite"
                        color="#c13145"
                        size={35}
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
  componentContainer: {
    flex: 1,
    backgroundColor: '#e5f2fa'
  },
  containerButtonsModal: {
    flexDirection: "row",
    width: '80%',
    justifyContent: "space-around",
    alignItems: "center",
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
  cancelarButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
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
  header: {
    fontWeight: "bold",
    fontSize: 24,
    paddingTop: 16,
    color: "#fff",
    textTransform: 'uppercase',
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
  modal: {
    backgroundColor: '#000000aa',
    flex: 1
  },
  vista_modal: {
    backgroundColor: '#fff',
    marginVertical: '83%',
    marginHorizontal: '10%',
    padding: 20,
    borderRadius: 10,
    flex: 1
  },
  button_can: {
    height: 30,
    width: 70,
    marginVertical: 10
  },
  button_elim: {
    height: 30,
    width: 70,
    marginVertical: 10,
    marginRight: 10
  },
  button_text: {
    color: '#005FAC',
    fontWeight: 'bold'
  },
  buttonLogin: {
    marginTop: 10
  },
});

export default BibliotecaScreen;
