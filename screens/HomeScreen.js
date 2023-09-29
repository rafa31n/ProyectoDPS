import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";

const HomeScreen = () =>{


    return(
        <View style={styles.container}>
            <View style={styles.container_header}>
            <Text style={styles.title}>Inicio</Text>
            </View>
            <View style={styles.container_body}>

                <Text style={styles.articleText}>Observa tus listas</Text>
                <View style={styles.articleContainer}>
                    <Text style={styles.headText}>Parece que aun no tienes listas</Text>
                    <TouchableOpacity style={styles.buttons}>
                        <Text>Añadir una lista</Text>
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
    title: {
        fontSize: 24,
        marginBottom: 15,
        color: "white"
    },
    text_body:{
        fontSize: 16,
        
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    container_header: {
        width: '100%',
        height: '8%',
        backgroundColor: '#006294',
        justifyContent: 'center',
        alignItems: 'left',
        paddingLeft: 25
    },
    container_body:{
        padding: 10
    },
    buttons:{
        marginTop:15,
        marginBottom: 15,
        backgroundColor: '#229CFF',
        width: "80%",
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    }, 
    headText:{
        marginTop: 20
    },
    articleText:{
        fontSize:20,
        marginBottom: 10,
        marginTop: 10
    },
    articleContainer:{
        width: 350,
        borderRadius: 10,
        backgroundColor: "#DFDFDF",
        justifyContent: 'center',
        alignItems: 'center'

    }
});
export default HomeScreen;