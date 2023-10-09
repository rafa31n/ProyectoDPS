import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { bibliotecaRecetas } from "../src/api/api";
import React, { useState, useEffect } from 'react';

const BibliotecaScreen = () => {
  const [idReceta, setIdReceta] = useState("");
  const [titulo, setTitulo] = useState("");
  const [tiempoComida, settiempoComida] = useState("");
  const [duracion, setduracion] = useState("");
  const [preparacion, setPreparacion] = useState("");

  const [idReceta2, setIdReceta2] = useState("");
  const [titulo2, setTitulo2] = useState("");
  const [tiempoComida2, settiempoComida2] = useState("");
  const [duracion2, setduracion2] = useState("");
  const [preparacion2, setPreparacion2] = useState("");

  const verRecetas = async () => {
    try {
      const loginUser = await bibliotecaRecetas();
      if (loginUser.data.status == 200) {
        console.log(loginUser.data.body)
        setTitulo(loginUser.data.body[0].titulo)
        settiempoComida(loginUser.data.body[0].tiempo_comida)
        setduracion(loginUser.data.body[0].duracion)
        setPreparacion(loginUser.data.body[0].preparacion)

        setTitulo2(loginUser.data.body[1].titulo)
        settiempoComida2(loginUser.data.body[1].tiempo_comida)
        setduracion2(loginUser.data.body[1].duracion)
        setPreparacion2(loginUser.data.body[1].preparacion)
      } else {
        alert('Credenciales incorrectas.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }

  }
  useEffect(() => {
    verRecetas();
  }, []);
  return (
    <View>
      <Text style={styles.header}>Biblioteca de recetas</Text>
      <View style={styles.container}>
        <Image style={styles.imagen} source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/3565/3565418.png',
        }} />
        <View style={styles.contenido}>
          <View>
            <Text style={styles.nombre}>{titulo}</Text>
            <Text style={styles.descripcion}>{preparacion}</Text>
            <Text style={styles.descripcion}>{tiempoComida}</Text>
            <Text style={styles.descripcion}>{duracion}</Text>
          </View>
          <TouchableOpacity>
            <Icon style={styles.icon}
              name='favorite' color='#000' size={25} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <Image style={styles.imagen} source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/3565/3565418.png',
        }} />
        <View style={styles.contenido}>
          <View>
            <Text style={styles.nombre}>{titulo2}</Text>
            <Text style={styles.descripcion}>{preparacion2}</Text>
            <Text style={styles.descripcion}>{tiempoComida2}</Text>
            <Text style={styles.descripcion}>{duracion2}</Text>
          </View>
          <TouchableOpacity>
            <Icon style={styles.icon}
              name='favorite' color='#000' size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  contenido: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 14,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingLeft: 16,
    paddingTop: 16,
  },
  icon: {
    padding: 10,
  },
});

export default BibliotecaScreen;