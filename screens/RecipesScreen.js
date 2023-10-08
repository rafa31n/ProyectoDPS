import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

  const RecipesScreen = () =>{

    const[nombre,setNombre]=useState("");
    const[descripcion,setDescripcion]=useState("");
    const[categoria,setCategoria]=useState("");
    const agregarRecetas=()=>{
        if (nombre=="" || descripcion=="" || categoria=="") {
          alert('llene los campos necesarios') 
        }else{
          alert('Receta Añadida correctamente')
        }
    }
    const navigation = useNavigation();

    return(
      <View style={styles.container}>
        <View style={styles.container_body}>
          <View style={styles.inputContainer}>
            <Text>Información de la receta</Text>
          </View>
            <View style={styles.inputContainer}>
              <TextInput placeholderTextColor="gray" onChangeText={(text)=> setNombre(text)} style={styles.input} placeholder="Nombre de receta"/>
            </View>
            <View style={styles.inputContainer}>
              <TextInput placeholderTextColor="gray" onChangeText={(text)=> setDescripcion(text)}  style={styles.input} placeholder="Descripcion de receta"/>
            </View>
            <View style={styles.inputContainer}>
              <TextInput placeholderTextColor="gray" onChangeText={(text)=> setCategoria(text)} style={styles.input} placeholder="Categoria de receta"/>
            </View>
          <TouchableOpacity  style={styles.buttonRegistrarse} onPress={agregarRecetas}>
          <Text style={styles.textBtnRegistrarse} >Agregar Receta</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.buttonRegistrarse} onPress={()=>navigation.navigate('AgregarIngredientes')}>
          <Text style={styles.textBtnRegistrarse} >Agregar lista de compras</Text>
        </TouchableOpacity>

        </View>
      
      
     
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      
    },
    inputContainer: {
      flexDirection: "row",
      borderColor: "#000",
      paddingBottom: 10,
      
    },
    input: {
      width: "60%",
      borderWidth: 1,
      borderColor: "black",
      padding: 5,
      flex: 0.9,
      color: 'black',
      borderRadius: 15,
    },
    container_body: {
      width: '100%',
      height: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonRegistrarse: {
      backgroundColor: '#229CFF',
      width: 300,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginTop:6
    },
    text: {
      textAlign: 'center',
      marginTop: 30,
      marginBottom: 0,
      color: '#fff',
    },
    buttonLogin: {
      backgroundColor: '#006294',
      width: 300,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
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
  
    }, icon: {
      padding: 10,
    },
  });
  export default RecipesScreen;