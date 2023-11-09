import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Register from '../../screens/RegisterScreen';
import Login from '../../screens/LoginScreen';
import Home from '../../screens/HomeScreen';
import Google from '../../screens/GoogleScreen';
import Recetas from '../../screens/RecetasPersonales';
import ListaIngredientes from '../../screens/ListaDeCompra';
import BibliotecaRecetas from '../../screens/BibliotecaRecetas';
import MisRecetas from '../../screens/RecetasFavoritas';
import MiPerfil from '../../screens/MiPerfil';
import ModificarReceta from '../../screens/ModificarReceta';
import AddRecetaPersonal from '../../screens/AddRecetaPersonal';
import EditRecetaPersonal from '../../screens/EditRecetaPersonal';

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
                <Stack.Screen name='Modificar' component={ModificarReceta} />
                <Stack.Screen name='AddRecetaPersonal' component={AddRecetaPersonal} />
                <Stack.Screen name='EditRecetaPersonal' component={EditRecetaPersonal} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;