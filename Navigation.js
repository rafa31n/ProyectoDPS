import React from 'react';
import { createDrawerNavigator, useDrawerStatus } from "@react-navigation/drawer";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import RecipesScreen from './screens/RecipesScreen';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Nav(){

    return(
        <Drawer.Navigator>
            <Drawer.Screen name='Inicio' component={HomeScreen}/>
            <Drawer.Screen name='Recetas' component={RecipesScreen}/>
            <Drawer.Screen name='Listas' component={ListScreen}/>
        </Drawer.Navigator>
    );
}


const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Register' component={RegisterScreen} />
                <Stack.Screen name='Home' component={Nav} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;