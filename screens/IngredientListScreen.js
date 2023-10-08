import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity, Button,
  FlatList,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
const IngredientList = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [nuevoIngrediente, setNuevoIngrediente] = useState('');

  const handleNuevoIngredienteChange = (text) => {
    setNuevoIngrediente(text);
  };

  const handleAgregarIngrediente = () => {
    if (nuevoIngrediente.trim() === '') {
      alert("Ingrese un dato")
    } else {
      setIngredientes([...ingredientes, nuevoIngrediente]);
      setNuevoIngrediente('');
    }


  };

  const handleEliminarIngrediente = (index) => {
    const nuevosIngredientes = [...ingredientes];
    nuevosIngredientes.splice(index, 1);
    setIngredientes(nuevosIngredientes);
  };

  const handleAgregarLista = () => {
    if (ingredientes.length > 0) {
      alert("lista de ingredientes agregada")
    } else {
      alert("lista esta vacia, agregue algun ingrediente ")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Lista de compras</Text>
      <Text style={styles.label}>Item que desea comprar:</Text>
      <TextInput
        style={styles.input}
        value={nuevoIngrediente}
        onChangeText={handleNuevoIngredienteChange}
        placeholder="Nuevo Item"
      />
      <Button title="Agregar" onPress={handleAgregarIngrediente} />

      <Text style={styles.label}>Lista de Compras:</Text>
      <FlatList
        data={ingredientes}
        renderItem={({ item, index }) => (
          <View style={styles.ingredienteItem}>
            <Text>{item}</Text>
            <Button
              title="Eliminar"
              onPress={() => handleEliminarIngrediente(index)}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={styles.buttonRegistrarse}>
        <Text style={styles.textBtnRegistrarse} onPress={handleAgregarLista}>Agregar los Items</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonRegistrarse: {
    backgroundColor: '#4CAF50',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textBtnRegistrarse: {
    textAlign: 'center',
    marginTop: 0,
    color: 'white',
  },
});

export default IngredientList