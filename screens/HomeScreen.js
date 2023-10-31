import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const userId = route.params?.param1;
    console.log(userId)
    const username = route.params?.param2;

    const [datosUsuario, setDatosUsuario] = useState(null);
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
        <View style={styles.container}>
            <View style={styles.container_body}>
                <View style={styles.container_header}>
                    {datosUsuario ? (
                        <Text style={styles.headerText}>Bienvenido {datosUsuario.username}</Text>
                    ) : (
                        <Text style={styles.headerText}>Bienvenido</Text>
                    )}

                    <TouchableOpacity onPress={() => navigation.navigate('Perfil', { userId })}>
                        <Icon style={styles.icon}
                            name='account' color='#000' size={50} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.articleText}>Lista de compra</Text>
                <View style={styles.articleContainer}>

                    <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('AgregarIngredientes')}>
                        <Text>Añadir una lista</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.articleText}>Agregar recetas</Text>
                <View style={styles.articleContainer}>
                    <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('Agregar recetas')}>
                        <Text>Añadir una receta</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.articleText}>Biblioteca recetas</Text>
                <View style={styles.articleContainer}>
                    <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('Biblioteca recetas')}>
                        <Text>Ver Biblioteca</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.articleText}>Mis recetas</Text>
                <View style={styles.articleContainer}>

                    <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('Mis recetas')}>
                        <Text>Añadir una receta</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    container_header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
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
        padding: 10
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
        width: 350,
        borderRadius: 10,
        backgroundColor: "#DFDFDF",
        justifyContent: 'center',
        alignItems: 'center'

    }
});
export default HomeScreen;