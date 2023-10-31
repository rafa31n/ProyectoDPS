import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import IconFA from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Fontisto';
import { useNavigation } from "@react-navigation/native";

const BibliotecaScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://10.0.2.2:4000/api/recetas')
      .then((response) => response.json())
      .then((data) => {
        setData(data);        
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      });
  }, []);

  return (
    <View>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.leftElement}>
            <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate('Home')}>
              <IconFA style={styles.icon}
                name='arrow-back-circle' color='#fff' size={25} />
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
                  <Image style={styles.imagen} source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/3565/3565418.png',
                  }} />
                  <View style={styles.contenido}>
                    <View>
                      <Text style={styles.tituloReceta}>{item.titulo}</Text>
                      <Text>Tiempo de comida: {item.tiempo_comida}</Text>
                      <Text>Duración: {item.duracion}</Text>
                      <Text>Preparación: {item.preparacion}</Text>
                    </View>
                    <TouchableOpacity>
                      <Icon style={styles.icon}
                        name='favorite' color='#c13145' size={25} />
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
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#006294',
    flexDirection: 'row',
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
    fontWeight: 'bold',
    fontSize: 24,
    paddingTop: 16,
    color: '#fff'
  },
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
  tituloReceta: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    margin: 10,
  },
  scroll: {
    backgroundColor: '#e5f2fa',
    height: '100%'
  },
});

export default BibliotecaScreen;