import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconFA from "react-native-vector-icons/Ionicons";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [primerNombre, setPrimerNombre] = useState('');
  const [segundoNombre, setSegundoNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const abrirModal = (item) => {
    setEditModalVisible(true);

    setPrimerNombre(datosUsuario.body[0].primer_nombre)
    setSegundoNombre(datosUsuario.body[0].segundo_nombre)
    setPrimerApellido(datosUsuario.body[0].primer_apellido)
    setSegundoApellido(datosUsuario.body[0].segundo_apellido)
    setCorreo(datosUsuario.body[0].correo)
    setUsername(datosUsuario.body[0].username)
    setPassword(datosUsuario.body[0].contrasena)
  };

  const handleInput1Change = (text) => {
    setPrimerNombre(text)
  };
  const handleInput2Change = (text) => {
    setSegundoNombre(text)
  };
  const handleInput3Change = (text) => {
    setPrimerApellido(text)
  };
  const handleInput4Change = (text) => {
    setSegundoApellido(text)
  };
  const handleInput5Change = (text) => {
    setCorreo(text)
  };
  const handleInput6Change = (text) => {
    setUsername(text)
  };

  const confirmarEditar = () => {
    if (primerNombre.length > 0 && primerApellido.length > 0
      && segundoNombre.length > 0 && segundoApellido.length > 0
      && correo.length > 0 && username.length > 0 && password.length > 0) {
      AsyncStorage.getItem('datosUsuario')
        .then((data) => {
          if (data) {
            const datos = JSON.parse(data);

            const postData = {
              id: datos.userId,
              primer_nombre: primerNombre,
              segundo_nombre: segundoNombre,
              primer_apellido: primerApellido,
              segundo_apellido: segundoApellido,
              username: username,
              contrasena: password,
              correo: correo
            }

            fetch('http://10.0.2.2:4000/api/usuario/registro', {
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
                  alert('Información actualizada correctamente.')
                  navigation.navigate('Home');
                } else {
                  alert('Error al realizar la solicitud.');
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
    } else {
      alert("Completa todos los campos solicitados.")
    }
  }

  useEffect(() => {
    AsyncStorage.getItem('datosUsuario')
      .then((data) => {
        if (data) {
          const datos = JSON.parse(data);
          console.log(datos.userId)
          fetch("http://10.0.2.2:4000/api/usuario/" + datos.userId)
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              setDatosUsuario(data)
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
    <View style={styles.container}>
      <Modal isVisible={editModalVisible}>
        <View style={styles.modalContainer}>
          {datosUsuario ? (
            <View style={styles.modalContainerInputs}>
              {datosUsuario.body.map((item, index) => (
                <View key={index}>
                  <Text style={styles.label}>Primer nombre:</Text>
                  <TextInput style={styles.txtInput}
                    value={primerNombre}
                    onChangeText={handleInput1Change}></TextInput>

                  <Text style={styles.label}>Segundo nombre:</Text>
                  <TextInput style={styles.txtInput}
                    value={segundoNombre}
                    onChangeText={handleInput2Change}></TextInput>

                  <Text style={styles.label}>Primer apellido:</Text>
                  <TextInput style={styles.txtInput}
                    value={primerApellido}
                    onChangeText={handleInput3Change}></TextInput>

                  <Text style={styles.label}>Segundo apellido:</Text>
                  <TextInput style={styles.txtInput}
                    value={segundoApellido}
                    onChangeText={handleInput4Change}></TextInput>

                  <Text style={styles.label}>Email:</Text>
                  <TextInput style={styles.txtInput}
                    value={correo}
                    onChangeText={handleInput5Change}></TextInput>

                  <Text style={styles.label}>Username:</Text>
                  <TextInput style={styles.txtInput}
                    value={username}
                    onChangeText={handleInput6Change}></TextInput>
                </View>
              ))}
            </View>
          ) : (
            <View></View>
          )}

          <View style={styles.containerButtonsModal}>
            <TouchableOpacity
              style={styles.confirmarButton}
              onPress={() => {
                confirmarEditar();
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
            <Text style={styles.header}>Mi perfil</Text>
          </View>
        </View>

        <View style={styles.containerBody}>
          {datosUsuario ? (
            <View style={styles.containerProfile}>
              <Icon
                style={styles.iconProfile}
                name="user-astronaut"
                color="#272727"
                size={150}
              />
              {datosUsuario.body.map((item, index) => (
                <View key={index}>
                  <Text style={styles.label}>Nombres:</Text>
                  <Text style={styles.text}>{item.primer_nombre} {item.segundo_nombre}</Text>

                  <Text style={styles.label}>Apellidos:</Text>
                  <Text style={styles.text}>{item.primer_apellido} {item.segundo_apellido}</Text>

                  <Text style={styles.label}>Email:</Text>
                  <Text style={styles.text}>{item.correo}</Text>

                  <Text style={styles.label}>Username:</Text>
                  <Text style={styles.text}>{item.username}</Text>
                </View>
              ))}
              <View style={styles.containerBtnsPerfil}>
                <TouchableOpacity
                  style={styles.btnEditPerfil}
                  onPress={() => abrirModal()}>
                  <Text>Editar perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnEditPassword}
                  onPress={() => console.log("cambiar contra")}>
                  <Text style={{ color: '#fff' }}>Cambiar contraseña</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text>No se pudo completar la petición. Vuelve a intentarlo</Text>
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
  modalContainerInputs: {
    width: '80%',
    marginBottom: 25,
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
  containerBtnsPerfil: {
    flexDirection: 'row'
  },
  btnEditPerfil: {
    backgroundColor: '#06BA63',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    marginBottom: 0,
  },
  btnEditPassword: {
    backgroundColor: '#c13145',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    marginBottom: 0,
  },
  iconProfile: {
    marginTop: 15,
    marginBottom: 25,
  },
  containerProfile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center'
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center'
  },
  containerBody: {
    padding: 15,
  },
  header: {
    fontWeight: "bold",
    fontSize: 24,
    paddingTop: 16,
    color: "#fff",
    textTransform: 'uppercase',
  },
  icon: {
    marginHorizontal: 5,
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
  container: {
    flex: 1,
    backgroundColor: '#e5f2fa'
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonsphoto: {
    backgroundColor: '#80bfff',
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
  btnCambiarInfo: {
    backgroundColor: '#70B77E',
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    color: '#fff',
    margin: 15,
  },
  txtInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#272727',
    padding: 5,
    marginBottom: 2,
    borderRadius: 15,
    color: '#000',
  }
});

export default ProfileScreen;