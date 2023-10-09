import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Icon style={styles.icon}
        name='account' color='#000' size={200} />
      <TouchableOpacity style={styles.buttonsphoto}>
        <Text>Cambiar foto de perfil</Text>
      </TouchableOpacity>
      <Text style={styles.name}>Usuario</Text>
      <Text style={styles.email}>Nombres: </Text>
      <Text style={styles.email}>Apellidos: </Text>
      <Text style={styles.email}>Correo electronico: </Text>
      <TouchableOpacity style={styles.btnCambiarInfo}>
        <Text>Actualizar información</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
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
  }
});

export default ProfileScreen;