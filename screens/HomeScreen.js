import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";


const HomeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const parametro = route.params?.parametro;
    console.log(parametro)
    return (
        <View style={styles.container}>
            <View style={styles.container_body}>
                <Text style={styles.headerText}>Bienvenido: {parametro}</Text>
                <Text style={styles.articleText}>Lista de compra</Text>
                <View style={styles.articleContainer}>
                    <Text style={styles.headText}>Parece que aun no tienes listas creadas.</Text>
                    <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('Lista de compra')}>
                        <Text>Añadir una lista</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.articleText}>Agregar recetas</Text>
                <View style={styles.articleContainer}>
                    <Text style={styles.headText}>De momento no hay recetas.</Text>
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
                    <Text style={styles.headText}>De momento no hay recetas favoritas.</Text>
                    <TouchableOpacity style={styles.buttons} onPress={()=>navigation.navigate('AgregarRecetas')} onPress={() => navigation.navigate('Mis recetas')}>
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