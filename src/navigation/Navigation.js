import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import RegisterScreen from '../../screens/RegisterScreen';
import LoginScreen from '../../screens/LoginScreen';
import HomeScreen from '../../screens/HomeScreen';
import GoogleScreen from '../../screens/GoogleScreen';
import RecipesScreen from '../../screens/RecipesScreen';
import IngredientList from '../../screens/IngredientListScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                 <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Home' component={HomeScreen} />
               
                <Stack.Screen name='Register' component={RegisterScreen} />
                <Stack.Screen name='AgregarRecetas' component={RecipesScreen}/>
                <Stack.Screen name='AgregarIngredientes' component={IngredientList}/>

                <Stack.Screen name='Google' component={GoogleScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;