import React, { useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import * as Facebook from 'expo-facebook'
import * as SecureStore from 'expo-secure-store'

export default function Login({setLoginToken}) {

    const saveTokenToSecureStorage = async (_token) => {
        await SecureStore.setItemAsync('token', _token);
        setLoginToken(_token);
    }
    
    const login = async () => {
        try {
            await Facebook.initializeAsync({appId: '918414992436403', appName: 'Collate'})
            const { type, token } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile']
            })
        
            if(type === 'success') {
                saveTokenToSecureStorage(token);
            }
        
        } catch({message}) {
            console.log(message);
        }
    }

    return (
        <View style={styles.container}>
            <Button 
                title="Login With Facebook" 
                onPress={() => login()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
});