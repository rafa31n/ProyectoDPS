import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/EvilIcons';
import IconAD from 'react-native-vector-icons/AntDesign';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [datosUsuario, setDatosUsuario] = useState(null);
    const [modalLogOut, setModalLogOut] = useState(false);

    const logout = () => {
        AsyncStorage.removeItem('datosUsuario');
        navigation.navigate('Login')
    }

    useEffect(() => {
        AsyncStorage.getItem('datosUsuario')
            .then((data) => {
                if (data) {
                    const datos = JSON.parse(data);
                    setDatosUsuario(datos);
                }
            })
            .catch((error) => {
                console.error('Error al recuperar datos de AsyncStorage:', error);
            });
    }, []);

    return (
        <View style={styles.componentContainer}>
            <Modal isVisible={modalLogOut}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>
                        ¿Desea cerrar sesión?
                    </Text>
                    <View style={styles.containerButtonsModal}>
                        <TouchableOpacity
                            style={styles.confirmarButtonPass}
                            onPress={() => {
                                logout();
                            }}
                        >
                            <Text style={styles.btnEditPerfilTxt}>Confirmar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelarButton}
                            onPress={() => {
                                setModalLogOut(false);
                            }}
                        >
                            <Text style={styles.btnEditPerfilTxt}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <ScrollView>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={styles.buttonLogin}
                        onPress={() => navigation.navigate('Perfil')}>
                        <Icon style={styles.icon}
                            name='user' color='white' size={50} />
                    </TouchableOpacity>

                    <View style={styles.centerElement}>
                        {datosUsuario ? (
                            <Text style={styles.header}>Bienvenido {datosUsuario.username}</Text>
                        ) : (
                            <Text style={styles.header}>Bienvenido!!</Text>
                        )}
                    </View>
                    <View style={styles.rightElement}>
                        <TouchableOpacity
                            style={styles.buttonLogOut}
                            onPress={() => setModalLogOut(true)}>
                            <IconAD style={styles.icon}
                                name='logout' color='white' size={30} />
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.container_body}>
                    
                    <TouchableOpacity onPress={() => navigation.navigate('ListaPersonal')}>
                        <View style={styles.articleContainer}>
                            <Image style={styles.image}
                                source={require('../src/imgs/lista_personal.jpeg')} />
                            <Text style={styles.articelTitle}>Listas personales</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('AgregarRecetas')}>
                        <View style={styles.articleContainer}>
                            <Image style={styles.image}
                                source={require('../src/imgs/receta_personal.jpeg')} />
                            <Text style={styles.articelTitle}>Recetas personales</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('BibliotecaRecetas')}>
                        <View style={styles.articleContainer}>
                            <Image style={styles.image}
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/196/196039.png' }} />
                            <Text style={styles.articelTitle}>Biblioteca de recetas</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('MisRecetas')}>
                        <View style={styles.articleContainer}>
                            <Image style={styles.image}
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3003/3003655.png' }} />
                            <Text style={styles.articelTitle}>Recetas favoritas</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    btnEditPerfilTxt: {
        color: '#f5f5f5',
        fontWeight: 'bold'
    },
    confirmarButtonPass: {
        backgroundColor: '#c13145',
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
    icon: {
        padding: 5,
    },
    componentContainer: {
        flex: 1,
        backgroundColor: '#e5f2fa'
    },
    headerContainer: {
        backgroundColor: "#006294",
        flexDirection: "row",
    },
    rightElement: {
        marginLeft: 16,
        marginTop: 8,
        flexDirection: 'row',
    },
    centerElement: {
        marginBottom: 20,
        width: '60%',
        height: '100%',
    },
    buttonLogin: {
        margin: 10,
    },
    buttonLogOut: {
        margin: 5,
    },
    header: {
        fontWeight: "bold",
        fontSize: 24,
        paddingTop: 16,
        color: "#fff",
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
        color: 'white'
    },
    title: {
        fontSize: 24,
        marginBottom: 15,
        color: "white"
    },
    text_body: {
        fontSize: 16,

    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    container_body: {
        padding: 10,
    },
    buttons: {
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: '#229CFF',
        width: "80%",
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    headText: {
        marginTop: 20
    },
    articleText: {
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10
    },
    articleContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderRadius: 15,
        backgroundColor: "#F9F9F9",
        alignItems: 'left',
        padding: 10,
        flexWrap: 'wrap',
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    articelTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#DD4D4D',
        marginLeft: 15,
        textTransform: 'uppercase',
        padding: 10,
        marginTop: 15,
    },
    image: {
        width: 75,
        height: 75,
    },
    container_title: {
        backgroundColor: '#006294',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    }
});
export default HomeScreen;