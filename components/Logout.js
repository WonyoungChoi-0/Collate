import React, { useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import * as Facebook from 'expo-facebook'
import * as SecureStore from 'expo-secure-store'

export default function Logout({setLoginToken}) {

    const logout = async () => {
        setLoginToken(undefined);
    }

    return (
        <View style={styles.container}>
            <Button 
                title="Logout" 
                onPress={() => logout()}
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