import React, { useState } from "react";
import Modal from "react-native-modal";
import IconFA from 'react-native-vector-icons/Ionicons';
import IconAD from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TextInput, TouchableOpacity, Button, FlatList, View, ScrollView } from "react-native";

const IngredientList = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [nuevoIngrediente, setNuevoIngrediente] = useState("");
  const [eliminarIndex, setEliminarIndex] = useState(-1); // Índice del elemento a eliminar
  const [editarIndex, setEditarIndex] = useState(-1); // Índice del elemento a editar
  const [editModalVisible, setEditModalVisible] = useState(false);
  const navigation = useNavigation();

  const [editIngrediente, setEditIngrediente] = useState(""); // Valor del elemento en edición

  const handleNuevoIngredienteChange = (text) => {
    setNuevoIngrediente(text);
  };

  const handleAgregarIngrediente = () => {
    if (nuevoIngrediente.trim() === "") {
      alert("Ingrese un dato");
    } else {
      setIngredientes([...ingredientes, nuevoIngrediente]);
      setNuevoIngrediente("");
    }
  };

  const confirmarEliminacion = (index) => {
    setEliminarIndex(index);
    setEditModalVisible(true);
  };

  const handleEliminarIngrediente = () => {
    if (eliminarIndex !== -1) {
      const nuevosIngredientes = [...ingredientes];
      nuevosIngredientes.splice(eliminarIndex, 1);
      setIngredientes(nuevosIngredientes);
      setEliminarIndex(-1); // Restablecer el índice de eliminación
    }
    setEditModalVisible(false);
  };

  const confirmarEdicion = (index) => {
    setEditarIndex(index);
    setEditIngrediente(ingredientes[index]);
    setEditModalVisible(true);
  };

  const handleGuardarEdicion = () => {
    if (editarIndex !== -1 && editIngrediente.trim() !== "") {
      const nuevosIngredientes = [...ingredientes];
      nuevosIngredientes[editarIndex] = editIngrediente;
      setIngredientes(nuevosIngredientes);
      setEditIngrediente("");
      setEditarIndex(-1); // Restablecer el índice de edición
    }
    setEditModalVisible(false);
  };

  const handleAgregarLista = () => {
    if (ingredientes.length > 0) {
      alert("Lista de ingredientes agregada");
    } else {
      alert("La lista está vacía, agregue algún ingrediente");
    }
  };

  return (
    <View style={styles.container}>
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
            <Text style={styles.header}>Lista de Compras</Text>
          </View>
        </View>

        <View style={styles.containerBody}>
          <View>
            <Text style={styles.label}>Item que desea comprar:</Text>
            <TextInput
              style={styles.input}
              value={nuevoIngrediente}
              onChangeText={handleNuevoIngredienteChange}
              placeholder="Nuevo Item"
            />
            <Button title="Agregar" onPress={handleAgregarIngrediente} />
          </View>

          <Text style={styles.label}>Lista de Compras:</Text>
          <FlatList
            data={ingredientes}
            renderItem={({ item, index }) => (
              <View style={styles.ingredienteItem}>
                <View style={styles.containerLista}>
                  <Text style={styles.itemText} >{item}</Text>
                  <View style={styles.containerBtnsLista}>
                    <TouchableOpacity
                      style={styles.eliminarButton}
                      onPress={() => confirmarEliminacion(index)}
                    >
                      <IconAD
                        style={styles.icon}
                        name="delete"
                        color="#fff"
                        size={25}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.editarButton}
                      onPress={() => confirmarEdicion(index)}
                    >
                      <IconAD
                        style={styles.icon}
                        name="edit"
                        color="#fff"
                        size={25}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />

          <TouchableOpacity style={styles.buttonRegistrarse}>
            <Text style={styles.textBtnRegistrarse} onPress={handleAgregarLista}>
              Agregar los Items
            </Text>
          </TouchableOpacity>
        </View>

        <Modal isVisible={editModalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              {editarIndex !== -1
                ? "Editar Item"
                : "¿Está seguro de que desea eliminar este Item?"}
            </Text>
            {editarIndex !== -1 ? (
              <TextInput
                style={styles.editInput}
                value={editIngrediente}
                onChangeText={(nuevoTexto) => setEditIngrediente(nuevoTexto)}
              />
            ) : null}
            {editarIndex !== -1 ? (
              <TouchableOpacity
                style={styles.butonModalEliminar}
                onPress={handleGuardarEdicion}
              >
                <Text style={styles.eliminarButtonText}>Guardar</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.butonModalEliminar}
                onPress={handleEliminarIngrediente}
              >
                <Text style={styles.eliminarButtonText}>Eliminar</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.cancelarButton}
              onPress={() => {
                setEditModalVisible(false);
                setEditIngrediente("");
                setEditarIndex(-1);
              }}
            >
              <Text style={styles.eliminarButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLista: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerBtnsLista: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  container: {
    flex: 1,
    backgroundColor: '#e5f2fa'
  },
  headerContainer: {
    backgroundColor: '#006294',
    flexDirection: 'row',
  },
  leftElement: {
    marginLeft: 16,
    marginRight: 25,
    marginTop: 8,
  },
  containerBody: {
    padding: 15,
  },
  itemText: {
    textAlign: 'center'
  },
  centerElement: {
    marginBottom: 20,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingTop: 16,
    color: '#fff'
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  ingredienteItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonRegistrarse: {
    backgroundColor: '#4CAF50',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,

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
  textBtnRegistrarse: {
    textAlign: 'center',
    marginTop: 0,
    color: 'white',
  },
  butonModalEliminar: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  eliminarButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
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
  eliminarButton: {
    backgroundColor: 'red',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flex: 0,
  },
  editarButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flex: 0,
  },
  eliminarButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  buttonLogin: {
    marginTop: 10
  },
});

export default IngredientList