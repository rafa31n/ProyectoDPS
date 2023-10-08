import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import RegisterScreen from '../../screens/RegisterScreen';
import LoginScreen from '../../screens/LoginScreen';
import HomeScreen from '../../screens/HomeScreen';
import GoogleScreen from '../../screens/GoogleScreen';
import ListasScreen from '../../screens/ListScreen';
import RecetasScreen from '../../screens/RecipesScreen';
import BibliotecaScreen from '../../screens/BibliotecaScreen';
import MisRecetasScreen from '../../screens/MisRecetasScreen';

const Stack = createNativeStackNavigator();


const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Home' component={HomeScreen} />
                    <Stack.Screen name='Google' component={GoogleScreen} />
                <Stack.Screen name='Register' component={RegisterScreen} />
                <Stack.Screen name='Agregar recetas' component={RecetasScreen} />
                <Stack.Screen name='Lista de compra' component={ListasScreen} />
                <Stack.Screen name='Biblioteca recetas' component={BibliotecaScreen} />
                <Stack.Screen name='Mis recetas' component={MisRecetasScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;