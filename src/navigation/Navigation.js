import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../../screens/HomeScreen';
//USUARIO
import Register from '../../screens/Usuario/RegisterScreen';
import Login from '../../screens/Usuario/LoginScreen';
import Google from '../../screens/Usuario/GoogleScreen';
import MiPerfil from '../../screens/Usuario/MiPerfil';
//RECETAS
import AddRecetaPersonal from '../../screens/Recetas/AddRecetaPersonal';
import BibliotecaRecetas from '../../screens/Recetas/BibliotecaRecetas';
import EditRecetaPersonal from '../../screens/Recetas/EditRecetaPersonal';
import IngredienteReceta from '../../screens/Recetas/IngredientesReceta';
import Recetas from '../../screens/Recetas/RecetasPersonales';
import MisRecetas from '../../screens/Recetas/RecetasFavoritas';
//LISTAS
import ListaIngredientes from '../../screens/Listas/ListaDeCompra';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='AgregarIngredientes' component={ListaIngredientes} />
                <Stack.Screen name='Google' component={Google} />
                <Stack.Screen name='Register' component={Register} />
                <Stack.Screen name='AgregarRecetas' component={Recetas} />
                <Stack.Screen name='BibliotecaRecetas' component={BibliotecaRecetas} />
                <Stack.Screen name='MisRecetas' component={MisRecetas} />
                <Stack.Screen name='Perfil' component={MiPerfil} />
                <Stack.Screen name='AddRecetaPersonal' component={AddRecetaPersonal} />
                <Stack.Screen name='EditRecetaPersonal' component={EditRecetaPersonal} />
                <Stack.Screen name='IngredienteReceta' component={IngredienteReceta} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;