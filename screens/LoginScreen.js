import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconAD from 'react-native-vector-icons/AntDesign';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { loginUsuario } from '../src/api/api.js';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const navigate = (param1, param2) => {
        navigation.navigate('Home', { param1, param2 });
    };

    const iniciarSesion = async () => {
        if (usuario.length > 0 && contrasena.length > 0) {
            try {
                const data = {
                    username: usuario,
                    contrasena: contrasena
                }
                const loginUser = await loginUsuario(data);
                if (loginUser.data.status == 200) {
                    const userId = loginUser.data.body[0].id;
                    const dataUsuario = {
                        userId: userId,
                        username: usuario,
                    }
                    navigate(userId, usuario);
                } else {
                    alert('Credenciales incorrectas.');
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../src/imgs/logo_v1.png')}
                style={styles.imgLogo}
            />
            <View style={styles.container_body}>

                <View style={styles.inputContainer}>
                    <IconFA style={styles.icon}
                        name='user' color='#fff' size={25} />
                    <TextInput
                        style={styles.input}
                        placeholder="Usuario"
                        onChangeText={(text) => setUsuario(text)}
                        value={usuario}
                        placeholderTextColor="#fff"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <IconFA style={styles.icon}
                        name='lock' color='#fff' size={25} />
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

                <TouchableOpacity style={styles.buttonGoogle} onPress={() => navigation.navigate('Google')}>
                    <View style={styles.iconWrapper}>
                        <IconAD style={styles.icon}
                            name='google' color='#fff' size={20} />
                    </View>
                    <Text style={styles.textGoogle}>Iniciar sesión con Google</Text>
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
        height: '70%',
        backgroundColor: '#006294',
        borderTopLeftRadius: 80,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgLogo: {
        width: 200,
        height: 200,
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
        color: '#fff',
    },
    buttonGoogle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4285F4', // Color de fondo de Google
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 5,
    },
    iconWrapper: {
        marginRight: 10,
    },
    textGoogle: {
        color: 'white',
        fontWeight: 'bold',
    },
});
export default LoginScreen;

