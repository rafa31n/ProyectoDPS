import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Register from '../../screens/RegisterScreen';
import Login from '../../screens/LoginScreen';
import Home from '../../screens/HomeScreen';
import Google from '../../screens/GoogleScreen';
import Recetas from '../../screens/Recetas';
import ListaIngredientes from '../../screens/ListaDeCompra';
import BibliotecaRecetas from '../../screens/BibliotecaRecetas';
import MisRecetas from '../../screens/MisRecetas';
import MiPerfil from '../../screens/ProfileScreen';
import ModificarReceta from '../../screens/ModificarReceta';

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
                <Stack.Screen name='Agregar recetas' component={Recetas} />
                <Stack.Screen name='Biblioteca recetas' component={BibliotecaRecetas} />
                <Stack.Screen name='Mis recetas' component={MisRecetas} />
                <Stack.Screen name='Perfil' component={MiPerfil} />
                <Stack.Screen name='Modificar' component={ModificarReceta} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;