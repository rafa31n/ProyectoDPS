import React, { useEffect } from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
import { useNavigation } from "@react-navigation/native";

const Screen = () => {
    const { authorize, clearSession, user, error, isLoading } = useAuth0();
    const navigation = useNavigation();

    const onLogin = async () => {
        try {
            await authorize();
        } catch (e) {
            console.log(e);
        }
    };

    const onLogout = async () => {
        try {
            await clearSession();
        } catch (e) {
            console.log('Log out cancelled');
        }
    };

    if (isLoading) {
        return <View style={styles.container}><Text>Loading</Text></View>;
    }

    const loggedIn = user !== undefined && user !== null;

    const navigate = (parametro) => {
        const param1 = 11;
        navigation.navigate('Home', { param1, parametro });
    };

    if (loggedIn === true) {
        navigate(user.name);
    }

    return (
        <View style={styles.container}>
            <Button
                onPress={loggedIn ? onLogout : onLogin}
                title={loggedIn ? 'Cerrar sesión' : 'Iniciar sesión'}
            />
            <TouchableOpacity></TouchableOpacity>
        </View>
    );
};

const GoogleScreen = () => {
    return (
        <Auth0Provider domain={"dev-rcvuraxnmhg84ekd.us.auth0.com"} clientId={"jUQnOBkrIJ1PZGvFfwH0IUc3UpKldYCS"}>
            <Screen />
        </Auth0Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

export default GoogleScreen;