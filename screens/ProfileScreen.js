import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../src/imgs/perfil.png')}
        style={styles.profilePicture}
      />
      <TouchableOpacity style={styles.buttonsphoto}>
        <Text>Cambiar foto de perfil</Text>
        </TouchableOpacity>
      <Text style={styles.name}>Usuario</Text>
      <Text style={styles.email}>Correo electronico</Text>
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
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
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
}
});

export default ProfileScreen;