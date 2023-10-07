import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { useAuth0, Auth0Provider } from 'react-native-auth0';

const Screen = () => {
    const { authorize, clearSession, user, error, isLoading } = useAuth0();

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

    return (
        <View style={styles.container}>
            {loggedIn && <Text>You are logged in as {user.email}</Text>}
            {!loggedIn && <Text>You are not logged in</Text>}
            {error && <Text>{error.message}</Text>}

            <Button
                onPress={loggedIn ? onLogout : onLogin}
                title={loggedIn ? 'Log Out' : 'Log In'}
            />
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