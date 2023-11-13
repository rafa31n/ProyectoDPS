import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput } from "react-native";
import { useRoute } from '@react-navigation/native';
import IconFA from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/EvilIcons';
import IconAD from 'react-native-vector-icons/AntDesign';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ArticulosListaPersonal = () => {
    const navigation = useNavigation();
    const [data, setData] = useState(null);
    const [modalAddArticulo, setmodalAddArticulo] = useState(false);
    const [modalDeleteArt, setmodalDeleteArt] = useState(false);
    const [modalEditArt, setmodalEditArt] = useState(false);
    const [nombre, setNombre] = useState('');
    const [tipoArt, settipoArt] = useState('');
    const [cantidad, setcantidad] = useState('');

    const modalEditar = (item) => {
        AsyncStorage.setItem('articuloListaEdit', JSON.stringify(item));
        fetch("http://10.0.2.2:4000/api/articulos_personal/uno/" + item)
            .then((response) => response.json())
            .then((data) => {
                setNombre(data.body[0].nombre)
                settipoArt(data.body[0].tipo)
                setcantidad(data.body[0].cantidad)
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
                setLoading(false);
            });
        setmodalEditArt(true)
    }
    const modalDelete = (item) => {
        AsyncStorage.setItem('articuloListaDelete', JSON.stringify(item));
        setmodalDeleteArt(true)
    }
    const modalAdd = () => {
        AsyncStorage.getItem('listaPersonalID')
            .then((data) => {
                if (data) {
                    const datos = JSON.parse(data);
                    AsyncStorage.setItem('articuloListaP_Add', JSON.stringify(datos));
                }
            })
            .catch((error) => {
                console.error('Error al recuperar datos de AsyncStorage:', error);
            });
        setmodalAddArticulo(true)
    }
    const confirmarAgregar = () => {
        if (nombre.length > 0 && tipoArt.length > 0 && cantidad.length > 0) {
            AsyncStorage.getItem('articuloListaP_Add')
                .then((data) => {
                    if (data) {
                        console.log(data)
                        const datos = JSON.parse(data);
                        const postData = {
                            id: 0,
                            id_foraneo: datos,
                            nombre: nombre,
                            tipo: tipoArt,
                            cantidad: cantidad,
                        }
                        fetch('http://10.0.2.2:4000/api/articulos_personal', {
                            method: 'POST',
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
                                alert(data.body)
                                navigation.navigate('ListaPersonal')
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
            setmodalAddArticulo(false);
        } else {
            alert('Completa todos los campos.')
        }
    };

    const confirmarDelete = () => {
        AsyncStorage.getItem('articuloListaDelete')
            .then((data) => {
                if (data) {
                    const datos = JSON.parse(data);

                    const postData = {
                        id: datos,
                    }

                    fetch('http://10.0.2.2:4000/api/articulos_personal', {
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
                                navigation.navigate('ListaPersonal');
                            } else {
                                alert('Las credenciales ingresadas son incorrectas.');
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
    }

    const confirmarEditar = () => {
        if (nombre.length > 0 && tipoArt.length > 0 && cantidad.length > 0) {
            AsyncStorage.getItem('articuloListaEdit')
                .then((data) => {
                    if (data) {
                        const datos = JSON.parse(data);
                        AsyncStorage.getItem('listaPersonalID')
                            .then((data) => {
                                if (data) {
                                    const listaPersonalID = JSON.parse(data);
                                    const postData = {
                                        id: datos,
                                        id_foraneo: listaPersonalID,
                                        nombre: nombre,
                                        tipo: tipoArt,
                                        cantidad: cantidad,
                                    }
                                    console.log(postData)
                                    fetch('http://10.0.2.2:4000/api/articulos_personal', {
                                        method: 'POST',
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
                                            alert(data.body)
                                            navigation.navigate('ListaPersonal')
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
                    }
                })
                .catch((error) => {
                    console.error('Error al recuperar datos de AsyncStorage:', error);
                });
            setmodalAddArticulo(false);
        }
    }

    const handleInput1Change = (text) => {
        setNombre(text)
    };
    const handleInput2Change = (text) => {
        settipoArt(text)
    };
    const handleInput3Change = (text) => {
        setcantidad(text)
    };

    useEffect(() => {
        AsyncStorage.getItem('listaPersonalID')
            .then((data) => {
                if (data) {
                    const datos = JSON.parse(data);
                    fetch("http://10.0.2.2:4000/api/articulos_personal/" + datos)
                        .then((response) => response.json())
                        .then((data) => {
                            setData(data);
                        })
                        .catch((error) => {
                            console.error("Error al obtener los datos:", error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error al recuperar datos de AsyncStorage:', error);
            });
    }, []);

    return (
        <View style={styles.componentContainer}>

            <Modal isVisible={modalAddArticulo}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>
                        Agregar articulo
                    </Text>
                    <View style={styles.modalContainerInputs}>
                        <Text style={styles.label}>Nombre:</Text>
                        <TextInput style={styles.txtInput}
                            value={nombre}
                            onChangeText={handleInput1Change}></TextInput>

                        <Text style={styles.label}>Tipo:</Text>
                        <TextInput style={styles.txtInput}
                            value={tipoArt}
                            onChangeText={handleInput2Change}></TextInput>

                        <Text style={styles.label}>Cantidad:</Text>
                        <TextInput style={styles.txtInput}
                            value={cantidad}
                            onChangeText={handleInput3Change}></TextInput>
                    </View>
                    <View style={styles.containerButtonsModal}>
                        <TouchableOpacity
                            style={styles.confirmarButtonPass}
                            onPress={() => {
                                confirmarAgregar();
                            }}
                        >
                            <Text style={styles.btnEditPerfilTxt}>Confirmar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelarButton}
                            onPress={() => {
                                setmodalAddArticulo(false);
                            }}
                        >
                            <Text style={styles.btnEditPerfilTxt}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            <Modal isVisible={modalDeleteArt}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>
                        ¿Está seguro de que desea eliminar este artículo?
                    </Text>
                    <View style={styles.containerButtonsModal}>
                        <TouchableOpacity
                            style={styles.confirmarButtonPass}
                            onPress={() => {
                                confirmarDelete();
                            }}
                        >
                            <Text style={styles.btnEditPerfilTxt}>Confirmar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelarButton}
                            onPress={() => {
                                setmodalDeleteArt(false);
                            }}
                        >
                            <Text style={styles.btnEditPerfilTxt}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal isVisible={modalEditArt}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>
                        Editar articulo
                    </Text>
                    <View style={styles.modalContainerInputs}>
                        <Text style={styles.label}>Nombre:</Text>
                        <TextInput style={styles.txtInput}
                            value={nombre}
                            onChangeText={handleInput1Change}></TextInput>

                        <Text style={styles.label}>Tipo:</Text>
                        <TextInput style={styles.txtInput}
                            value={tipoArt}
                            onChangeText={handleInput2Change}></TextInput>

                        <Text style={styles.label}>Cantidad:</Text>
                        <TextInput style={styles.txtInput}
                            value={cantidad}
                            onChangeText={handleInput3Change}></TextInput>
                    </View>
                    <View style={styles.containerButtonsModal}>
                        <TouchableOpacity
                            style={styles.confirmarButton}
                            onPress={() => {
                                confirmarEditar();
                            }}
                        >
                            <Text style={styles.btnEditPerfilTxt}>Editar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelarButton}
                            onPress={() => {
                                setmodalEditArt(false);
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
                            onPress={() => navigation.navigate("ListaPersonal")}
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
                        <Text style={styles.header}>Articulos lista personal</Text>
                    </View>
                </View>

                <View style={styles.container_body}>

                    <TouchableOpacity style={styles.btnScreen}
                        onPress={() => modalAdd()}>
                        <Text style={styles.btnScreenText}>Agregar artículo</Text>
                    </TouchableOpacity>

                    {data && data.body && data.body.length > 0 ? (
                        <View>
                            {data.body.map((item) => (
                                <View style={styles.container} key={item.id}>
                                    <View style={styles.contenido}>
                                        <View>
                                            <Text style={styles.tituloReceta}>{item.nombre}</Text>
                                            <Text>Tipo: {item.tipo}</Text>
                                            <Text>Cantidad: {item.cantidad}</Text>
                                        </View>
                                        <View style={styles.contenido_icons}>
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
                                                onPress={() => modalDelete(item.id)}>
                                                <IconAD
                                                    style={styles.icon}
                                                    name="delete"
                                                    color="#c13145"
                                                    size={35}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View style={styles.container}>
                            <Text>No tienes artículos en esta lista.</Text>
                        </View>
                    )}

                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    confirmarButton: {
        backgroundColor: '#06BA63',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center'
    },
    modalContainerInputs: {
        width: '80%',
        marginBottom: 25,
    },
    txtInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#272727',
        padding: 5,
        marginBottom: 2,
        borderRadius: 15,
        color: '#000',
    },
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
export default ArticulosListaPersonal;