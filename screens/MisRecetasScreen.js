import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


const MisRecetasScreen = () => {
  return (
    <View>
      <Text style={styles.header}>Recetas favoritas</Text>
      <View style={styles.container}>
        <Image style={styles.imagen} source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/3565/3565418.png',
        }} />
        <Text style={styles.nombre}>Nombre receta</Text>
        <Text style={styles.descripcion}>Descripcion</Text>        
      </View>
      <View style={styles.container}>
        <Image style={styles.imagen} source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/3565/3565418.png',
        }} />
        <Text style={styles.nombre}>Nombre receta</Text>
        <Text style={styles.descripcion}>Descripcion</Text>
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
});

export default MisRecetasScreen;