import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Navigation from './components/Navigation';
import * as Facebook from 'expo-facebook'
import * as SecureStore from 'expo-secure-store'

export default function App() {
  
  const [logInToken, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkForToken()
  }, [])

  const saveTokenToSecureStorage = async (_token) => {
    await SecureStore.setItemAsync('token', _token);
    setToken(_token)
  }

  const checkForToken = async () => {
    let token = await SecureStore.getItemAsync('token')
    setToken(token)
    setLoading(false)
  }  

  const logIn = async () => {
    try {
      await Facebook.initializeAsync({appId: '918414992436403', appName: 'Collate'})
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile']
      })
  
      if(type === 'success') {
        saveTokenToSecureStorage(token) 
      }
  
    } catch({message}) {
      console.log(message)
    }
  }

  if(logInToken === null) {
    return (
      <View style={styles.container}>
        <Button title="Login With Facebook" onPress={() => logIn()}/>
      </View>
    );   
  } else {
    return <Navigation/>
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
