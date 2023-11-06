import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconFA from "react-native-vector-icons/Ionicons";

const HomeScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
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
        <View>
            <ScrollView>
                <View style={styles.headerContainer}>

                    <View style={styles.centerElement}>
                        {datosUsuario ? (
                            <Text style={styles.header}>Bienvenido {datosUsuario.username}</Text>
                        ) : (
                            <Text style={styles.header}>Bienvenido!!</Text>
                        )}
                    </View>
                    <View style={styles.rightElement}>
                        <TouchableOpacity
                            style={styles.buttonLogin}
                            onPress={() => navigation.navigate('Perfil')}>
                            <Icon style={styles.icon}
                                name='account' color='white' size={50} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.container_body}>
                    
                    <TouchableOpacity onPress={() => navigation.navigate('AgregarIngredientes')}>
                        <View style={styles.articleContainer}>
                            <Image style={styles.image} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4543/4543179.png' }} />
                            <Text style={styles.articelTitle}>Lista de compra</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Agregar recetas')}>
                        <View style={styles.articleContainer}>
                            <Image style={styles.image} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1091/1091916.png' }} />
                            <Text style={styles.articelTitle}>Agregar receta</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Biblioteca recetas')}>
                        <View style={styles.articleContainer}>
                            <Image style={styles.image} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/196/196039.png' }} />
                            <Text style={styles.articelTitle}>Biblioteca de recetas</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Mis recetas')}>
                        <View style={styles.articleContainer}>
                            <Image style={styles.image} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3003/3003655.png' }} />
                            <Text style={styles.articelTitle}>Mis recetas</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: "#006294",
        flexDirection: "row",
    },
    rightElement: {
        marginLeft: 16,
        marginRight: 25,
        marginTop: 8,
    },
    centerElement: {
        marginBottom: 20,
        width: '80%',
        height: '100%',
    },
    buttonLogin: {
        marginRight: 20,
    },
    header: {
        fontWeight: "bold",
        fontSize: 24,
        paddingTop: 16,
        color: "#fff",
        textAlign: 'center'
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
        backgroundColor: "#e5f2fa",
        height: "100%",
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