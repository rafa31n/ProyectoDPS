import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconFA from "react-native-vector-icons/Ionicons";
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

const AddRecetaPersonal = () => {
    const navigation = useNavigation();
    const [titulo, setTitulo] = useState('');
    const [preparacion, setPreparacion] = useState('');
    const [tiempoComida, setTiempoComida] = useState('Desayuno');

    //Date time picker
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [duracion, setDuracion] = useState('');

    const onChangeDuracion = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
        setDuracion(fTime)
    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }
    //

    const optionsTiempoComida = [
        { label: 'Desayuno', value: 'Desayuno' },
        { label: 'Almuerzo', value: 'Almuerzo' },
        { label: 'Cena', value: 'Cena' },
        { label: 'Merienda', value: 'Merienda' },
        { label: 'Refrigerio', value: 'Refrigerio' },
    ];

    const handleInput1Change = (text) => {
        setTitulo(text)
    };
    const handleInput4Change = (text) => {
        setPreparacion(text)
    };

    const agregarReceta = () => {
        if (titulo.length > 0 && tiempoComida.length > 0
            && preparacion.length > 0 && duracion.length > 0) {
            AsyncStorage.getItem('datosUsuario')
                .then((data) => {
                    if (data) {
                        const datos = JSON.parse(data);

                        const postData = {
                            id: 0,
                            titulo: titulo,
                            tiempo_comida: tiempoComida,
                            duracion: duracion,
                            preparacion: preparacion,
                            id_foraneo: datos.userId
                        }

                        fetch('http://10.0.2.2:4000/api/recetas_personales', {
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
                                    alert('Receta personal añadida correctamente.')
                                    navigation.navigate('Home')
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
        } else {
            alert("Completa todos los campos solicitados.")
        }
    }

    return (
        <View style={styles.componentContainer}>
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
                        <Text style={styles.header}>Añadir receta personal</Text>
                    </View>
                </View>

                <View style={styles.containerBody}>
                    <View>
                        <Text style={styles.label}>Titulo:</Text>
                        <TextInput style={styles.txtInput}
                            value={titulo}
                            onChangeText={handleInput1Change}></TextInput>

                        <Text style={styles.label}>Tiempo comida:</Text>
                        <View
                            style={{
                                borderWidth: 1,
                                borderRadius: 5
                            }}>
                            <Picker
                                selectedValue={tiempoComida}
                                onValueChange={(itemValue, itemIndex) => setTiempoComida(itemValue)}
                            >
                                {optionsTiempoComida.map((option) => (
                                    <Picker.Item label={option.label} value={option.value} key={option.value} />
                                ))}
                            </Picker>
                        </View>

                        <Text style={styles.label}>Duración:</Text>
                        <TouchableOpacity onPress={() => showMode('time')} style={styles.btnDuracion}>
                            <Text style={styles.txtDuracion}>Seleccionar duración</Text>
                        </TouchableOpacity>
                        {duracion.length > 0 ? (
                            <Text>Duración seleccionada: {duracion}</Text>
                        ) : (
                            <Text></Text>
                        )}
                        {show && (
                            <DateTimePicker
                                testID="'dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChangeDuracion}
                            />
                        )}

                        <Text style={styles.label}>Preparación:</Text>
                        <TextInput
                            style={styles.textArea}
                            multiline={true}
                            numberOfLines={4}
                            value={preparacion}
                            onChangeText={handleInput4Change}
                        />


                        <TouchableOpacity
                            style={styles.confirmarButton}
                            onPress={() => {
                                agregarReceta();
                            }}
                        >
                            <Text style={styles.btnText}>Agregar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    btnText: {
        color: '#f5f5f5',   
        textAlign: 'center',    
    },
    txtDuracion: {
        color: '#f5f5f5',
        textAlign: 'center',        
    },
    btnDuracion: {
        backgroundColor: '#26547C',
        padding: 10,
        borderRadius: 5,
    },
    confirmarButton: {
        backgroundColor: '#06BA63',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'center',
        width: '100%',
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#272727',
        borderRadius: 5,
        padding: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 5,
    },
    txtInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#272727',
        padding: 5,
        marginBottom: 2,
        borderRadius: 5,
        color: '#000',
    },
    containerBody: {
        backgroundColor: '#fff',
        padding: 25,
        margin: 25,
        marginTop: 20,
        borderRadius: 15,
    },
    btnScreen: {
        backgroundColor: '#3C7A89',
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
export default AddRecetaPersonal;