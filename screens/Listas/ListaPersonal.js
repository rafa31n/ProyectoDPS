import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useRoute } from '@react-navigation/native';
import IconFA from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/EvilIcons';
import IconAD from 'react-native-vector-icons/AntDesign';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListaPersonal = () => {
    const navigation = useNavigation();
    const [data, setData] = useState(null);
    const [datosUsuario, setDatosUsuario] = useState(null);
    const [modalDeleteLista, setModalDeleteLista] = useState(false);

    const deleteLista = (item) => {
        setModalDeleteLista(true);
        AsyncStorage.setItem('listaPersonalElim', JSON.stringify(item));
    }
    const modalEditar = (item) => {
        AsyncStorage.setItem('listaPersonalEdit', JSON.stringify(item));
        navigation.navigate('EditListaPersonal')
    }
    const agregarArticulos = (item) => {
        AsyncStorage.setItem('listaPersonalID', JSON.stringify(item));
        navigation.navigate('ArticulosListaPersonal')
    }
    

    const confirmarEliminar = () => {
        AsyncStorage.getItem('listaPersonalElim')
            .then((data) => {
                if (data) {
                    const postData = {
                        id: data,
                    }
                    fetch('http://10.0.2.2:4000/api/lista_personal', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(postData),
                    })
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            } else {
                                throw new Error('Error en la solicitud POST');
                            }
                        })
                        .then(data => {
                            console.log(data)
                            if (data.error === false) {
                                alert(data.body)
                                navigation.navigate('Home')
                            }
                        })
                        .catch(error => {
                            console.error('Error al realizar la solicitud:', error);
                            alert('Error al realizar la solicitud.')
                        });
                }
            })
            .catch((error) => {
                console.error('Error al recuperar datos de AsyncStorage:', error);
            });
        setModalDeleteLista(false);
    };


    useEffect(() => {
        AsyncStorage.getItem('datosUsuario')
            .then((data) => {
                if (data) {
                    const datos = JSON.parse(data);
                    fetch("http://10.0.2.2:4000/api/lista_personal/" + datos.userId)
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data)
                            setData(data);
                        })
                        .catch((error) => {
                            console.error("Error al obtener los datos:", error);
                            setLoading(false);
                        });
                }
            })
            .catch((error) => {
                console.error('Error al recuperar datos de AsyncStorage:', error);
            });
    }, []);

    return (
        <View style={styles.componentContainer}>
            <Modal isVisible={modalDeleteLista}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>
                        ¿Desea eliminar esta lista?
                    </Text>
                    <View style={styles.containerButtonsModal}>
                        <TouchableOpacity
                            style={styles.confirmarButtonPass}
                            onPress={() => {
                                confirmarEliminar();
                            }}
                        >
                            <Text style={styles.btnEditPerfilTxt}>Confirmar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelarButton}
                            onPress={() => {
                                setModalDeleteLista(false);
                            }}
                        >
                            <Text style={styles.btnEditPerfilTxt}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <ScrollView>
                <View style={styles.headerContainer}>
                    <View style={styles.leftElement}>
                        <TouchableOpacity
                            style={styles.buttonLogin}
                            onPress={() => navigation.navigate("Home")}
                        >
                            <IconFA
                                style={styles.icon}
                                name="arrow-back-circle"
                                color="#fff"
                                size={35}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.centerElement}>
                        <Text style={styles.header}>Listas personales</Text>
                    </View>
                </View>

                <View style={styles.container_body}>

                    <TouchableOpacity style={styles.btnScreen}
                        onPress={() => navigation.navigate("AddListaPersonal")}>
                        <Text style={styles.btnScreenText}>Agregar nueva lista personal</Text>
                    </TouchableOpacity>
                    {data && data.body && data.body.length > 0 ? (
                        <View>
                            {data.body.map((item) => (
                                <View style={styles.container} key={item.id}>
                                    <View style={styles.contenido}>
                                        <View>
                                            <Text style={styles.tituloReceta}>{item.titulo}</Text>
                                            <Text>Descripción: {item.descripcion}</Text>
                                            <Text>Fecha: {item.fecha}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.contenido_icons}>
                                        <TouchableOpacity
                                            onPress={() => agregarArticulos(item.id)}>
                                            <IconMI
                                                style={styles.icon}
                                                name="post-add"
                                                color="#c13145"
                                                size={35}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => modalEditar(item.id)}>
                                            <IconAD
                                                style={styles.icon}
                                                name="edit"
                                                color="#c13145"
                                                size={35}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => deleteLista(item.id)}>
                                            <IconAD
                                                style={styles.icon}
                                                name="delete"
                                                color="#c13145"
                                                size={35}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View style={styles.container}>
                            <Text>No tienes listas personales.</Text>
                        </View>
                    )}

                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    btnScreen: {
        backgroundColor: '#016FB9',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        marginBottom: 0,
    },
    btnScreenText: {
        color: '#F0EFF4',
        fontSize: 16,
        textAlign: 'center',
    },
    contenido_icons: {
        flexDirection: "row",
        marginTop: 15,
        alignSelf: 'center',
    },
    contenido: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    container: {
        backgroundColor: "#fff",
        borderRadius: 8,
        margin: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    tituloReceta: {
        fontWeight: "bold",
        fontSize: 16,
    },
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
export default ListaPersonal;