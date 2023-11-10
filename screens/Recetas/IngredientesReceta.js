import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import IconFA from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Fontisto";
import IconAD from "react-native-vector-icons/AntDesign";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";

const IngredientesReceta = ({ route }) => {
    const navigation = useNavigation();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [idReceta, setIdReceta] = useState('');
    const [nombreReceta, setNombreReceta] = useState('');
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editIngredienteModal, setEditIngredienteModal] = useState(false);
    const [deleteIngredienteModal, setDeleteIngredienteModal] = useState(false);

    const [nombreIngrediente, setNombreIngrediente] = useState('');
    const [tipoIngrediente, setTipoIngrediente] = useState('');
    const [cantidadIngrediente, setCantidadIngrediente] = useState('');

    const handleInput1Change = (text) => {
        setNombreIngrediente(text)
    };
    const handleInput2Change = (text) => {
        setTipoIngrediente(text)
    };
    const handleInput3Change = (text) => {
        setCantidadIngrediente(text)
    };

    const agregarIngrediente = () => {
        if (nombreIngrediente.length > 0 && tipoIngrediente.length > 0
            && cantidadIngrediente.length > 0) {
            const postData = {
                id: 0,
                id_foraneo: idReceta,
                nombre: nombreIngrediente,
                tipo: tipoIngrediente,
                cantidad: cantidadIngrediente,
            }

            fetch('http://10.0.2.2:4000/api/ingrediente_personales', {
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
                    console.log(data)
                    if (data.status == 200) {
                        alert('Ingrediente añadido correctamente a la receta: ' + nombreReceta)
                        navigation.navigate('Home');
                    } else {
                        alert('Error al realizar la solicitud.');
                    }
                })
                .catch(error => {
                    console.error('Error al realizar la solicitud:', error);
                    alert('Error al realizar la solicitud.')
                });
        } else {
            alert('Completa todos los campos solicitados.')
        }
    }

    const modalEditar = (text) => {
        AsyncStorage.setItem('idIngredienteEditar', JSON.stringify(text));
        fetch("http://10.0.2.2:4000/api/ingrediente_personales/uno/" + text)
            .then((response) => response.json())
            .then((data) => {
                setEditIngredienteModal(true);
                setNombreIngrediente(data.body[0].nombre)
                setTipoIngrediente(data.body[0].tipo)
                setCantidadIngrediente(data.body[0].cantidad)
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
                setLoading(false);
            });
    };

    const editIngrediente = () => {
        AsyncStorage.getItem('idIngredienteEditar')
            .then((data) => {
                if (data) {
                    const datos = JSON.parse(data);

                    const postData = {
                        id: datos,
                        id_foraneo: idReceta,
                        nombre: nombreIngrediente,
                        tipo: tipoIngrediente,
                        cantidad: cantidadIngrediente,
                    }

                    fetch('http://10.0.2.2:4000/api/ingrediente_personales', {
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
                            console.log(data)
                            if (data.status == 200) {
                                alert('Ingrediente actualizado correctamente.')
                                navigation.navigate('Home');
                            } else {
                                alert('Error al realizar la solicitud.');
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
    };

    const deleteIngrediente = (text) => {
        setDeleteIngredienteModal(true);
        AsyncStorage.setItem('idIngredienteEliminar', JSON.stringify(text));

    };

    const confirmarEliminar = () => {
        AsyncStorage.getItem('idIngredienteEliminar')
            .then((data) => {
                if (data) {
                    const postData = {
                        id: data,
                    }
                    fetch('http://10.0.2.2:4000/api/ingrediente_personales', {
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
                            if (data.status === 200) {
                                alert(data.body)
                                peticionFetch();
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
        setDeleteIngredienteModal(false);
    };

    const peticionFetch = () => {
        AsyncStorage.getItem('idRecetaIngredientes')
            .then((data) => {
                if (data) {
                    setIdReceta(data);
                    const datos = JSON.parse(data);
                    fetch("http://10.0.2.2:4000/api/ingrediente_personales/" + datos)
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data)
                            setData(data);
                            setLoading(false);
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
        AsyncStorage.getItem('idRecetaTitulo')
            .then((data) => {
                if (data) {
                    setNombreReceta(data);
                }
            })
            .catch((error) => {
                console.error('Error al recuperar datos de AsyncStorage:', error);
            });
    }

    useEffect(() => {
        peticionFetch();
    }, []);

    return (
        <View style={styles.componentContainer}>
            <Modal isVisible={editModalVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContainerInputs}>
                        <Text style={styles.label}>Ingrediente:</Text>
                        <TextInput style={styles.txtInput}
                            value={nombreIngrediente}
                            onChangeText={handleInput1Change}></TextInput>

                        <Text style={styles.label}>Tipo ingrediente:</Text>
                        <TextInput style={styles.txtInput}
                            value={tipoIngrediente}
                            onChangeText={handleInput2Change}></TextInput>

                        <Text style={styles.label}>Cantidad:</Text>
                        <TextInput style={styles.txtInput}
                            value={cantidadIngrediente}
                            onChangeText={handleInput3Change}></TextInput>
                    </View>
                    <View style={styles.containerButtonsModal}>
                        <TouchableOpacity
                            style={styles.confirmarButton}
                            onPress={() => {
                                agregarIngrediente();
                            }}
                        >
                            <Text style={styles.btnText}>Agregar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelarButton}
                            onPress={() => {
                                setEditModalVisible(false);
                            }}
                        >
                            <Text style={styles.btnText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal isVisible={editIngredienteModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContainerInputs}>
                        <Text style={styles.label}>Ingrediente:</Text>
                        <TextInput style={styles.txtInput}
                            value={nombreIngrediente}
                            onChangeText={handleInput1Change}></TextInput>

                        <Text style={styles.label}>Tipo ingrediente:</Text>
                        <TextInput style={styles.txtInput}
                            value={tipoIngrediente}
                            onChangeText={handleInput2Change}></TextInput>

                        <Text style={styles.label}>Cantidad:</Text>
                        <TextInput style={styles.txtInput}
                            value={cantidadIngrediente}
                            onChangeText={handleInput3Change}></TextInput>
                    </View>
                    <View style={styles.containerButtonsModal}>
                        <TouchableOpacity
                            style={styles.confirmarButton}
                            onPress={() => {
                                editIngrediente();
                            }}
                        >
                            <Text style={styles.btnText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelarButton}
                            onPress={() => {
                                setEditIngredienteModal(false);
                            }}
                        >
                            <Text style={styles.btnText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal isVisible={deleteIngredienteModal}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>
                        ¿Desea eliminar este ingrediente de la receta?
                    </Text>
                    <View style={styles.containerButtonsModal}>
                        <TouchableOpacity
                            style={styles.eliminarButton}
                            onPress={() => {
                                confirmarEliminar();
                            }}
                        >
                            <Text style={styles.btnText}>Eliminar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelarButton}
                            onPress={() => {
                                setDeleteIngredienteModal(false);
                            }}
                        >
                            <Text style={styles.btnText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <ScrollView>
                <View style={styles.headerContainer}>
                    <View style={styles.leftElement}>
                        <TouchableOpacity
                            style={styles.buttonLogin}
                            onPress={() => navigation.navigate("AgregarRecetas")}
                        >
                            <IconFA
                                style={styles.icon}
                                name="arrow-back-circle"
                                color="#fff"
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.centerElement}>
                        <Text style={styles.header}>Añadir ingredientes</Text>
                    </View>
                </View>

                <View style={styles.containerBody}>
                    <Text style={styles.nombreReceta}>Receta: {nombreReceta}</Text>

                    <TouchableOpacity style={styles.btnScreen} onPress={() => setEditModalVisible(true)}>
                        <Text style={styles.btnScreenText}>Agregar ingrediente</Text>
                    </TouchableOpacity>
                    {data ? (
                        <View>
                            {data && data.error === false && (
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
                                                        onPress={() => deleteIngrediente(item.id)}>
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
                            )}
                        </View>
                    ) : (
                        <View style={styles.container}>
                            <Text>No hay ingredientes para esta receta.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    btnText: {
        color: '#f5f5f5',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 5
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
    nombreReceta: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 15,
        marginBottom: 10,
        marginTop: 10,
    },
    containerBody: {
        padding: 5,
        backgroundColor: "#e5f2fa",
    },
    containerButtonsModal: {
        flexDirection: "row",
        width: '80%',
        justifyContent: "space-around",
        alignItems: "center",
    },
    containerReceta: {
        width: '100%',
        margin: 15,
    },
    confirmarButton: {
        backgroundColor: '#06BA63',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'center',
    },
    eliminarButton: {
        backgroundColor: '#c13145',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
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
        alignSelf: 'center',
    },
    tituloReceta: {
        fontWeight: "bold",
        fontSize: 16,
    },
    contenido: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    componentContainer: {
        flex: 1,
        backgroundColor: '#e5f2fa'
    },
    buttonLogin: {
        marginTop: 10
    },
    headerContainer: {
        backgroundColor: "#006294",
        flexDirection: "row",
    },
    leftElement: {
        marginLeft: 16,
        marginRight: 25,
        marginTop: 8,
    },
    centerElement: {
        marginBottom: 20,
    },
    icon: {
        marginHorizontal: 5,
    },
    scroll: {
        backgroundColor: "#e5f2fa",
        height: "100%",
    },
    header: {
        fontWeight: "bold",
        fontSize: 24,
        paddingTop: 16,
        color: "#fff",
        textTransform: 'uppercase'
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
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 30,
        textAlign: 'center',
        color: 'white'
    },
    input: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
        borderRadius: 15,
        color: '#000',
        margin: 5,
    },
    container_body: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnAgregar: {
        backgroundColor: '#229CFF',
        width: '90%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 6
    },
    textBtnLogin: {
        textAlign: 'center',
        marginTop: 0,
        color: '#fff',
        fontStyle: 'italic',
        textDecorationLine: 'underline',
    },
    textBtnRegistrarse: {
        textAlign: 'center',
        marginTop: 0,
        color: 'black',
    },
    containerInputs: {
        justifyContent: 'center', // Centrado vertical
        alignItems: 'center',
        marginTop: 30,
    },
    container_title: {
        backgroundColor: '#006294',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingBottom: 20
    }
});

export default IngredientesReceta;
