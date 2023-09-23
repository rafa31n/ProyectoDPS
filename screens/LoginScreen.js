import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';

const LoginScreen = () => {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const iniciarSesion = () => {
        if (usuario === 'usuario' && contrasena === 'contrasena') {
            alert('Inicio de sesión exitoso');
        } else {
            alert('Credenciales incorrectas');
        }
    };

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image
                source={require('../src/imgs/logo_v1.png')}
                style={styles.imgLogo}
            />
            <View style={styles.container_body}>

                <View style={styles.inputContainer}>
                    <Icon style={styles.icon}
                        name='person' color='#fff' />
                    <TextInput
                        style={styles.input}
                        placeholder="Usuario"
                        onChangeText={(text) => setUsuario(text)}
                        value={usuario}
                        placeholderTextColor="#fff"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon style={styles.icon}
                        name='lock' color='#fff' />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry={true}
                        onChangeText={(text) => setContrasena(text)}
                        value={contrasena}
                        placeholderTextColor="#fff"
                    />
                </View>

                <TouchableOpacity style={styles.buttonLogin} onPress={iniciarSesion}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <Text style={styles.text}>¿No tienes cuenta?</Text>
                <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.textBtnRegister}>Registrate aqui</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    buttonLogin: {
        backgroundColor: '#c13145',
        width: 300,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonRegister: {
        backgroundColor: '#006294',
        width: 300,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    container_body: {
        width: '100%',
        height: '50%',
        backgroundColor: '#006294',
        borderTopLeftRadius: 80,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgLogo: {
        width: 300,
        height: 300,
    },
    text: {
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 0,
        color: '#fff',
    },
    textBtnRegister: {
        textAlign: 'center',
        marginTop: 0,
        color: '#fff',
        fontStyle: 'italic',
        textDecorationLine: 'underline',
    },
    inputContainer: {
        flexDirection: 'row',
        borderColor: '#000',
        paddingBottom: 10,
    },
    icon: {
        padding: 10,
    },
    input: {
        width: '60%',
        borderWidth: 1,
        borderColor: '#fff',
        padding: 5,
        flex: 0.9,
        borderRadius: 15,
    },
});
export default LoginScreen;
