import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import * as Facebook from 'expo-facebook'
import * as SecureStore from 'expo-secure-store'
import { db } from '../config/firebase'
import { setDoc, doc, getDoc } from "firebase/firestore"; 

export default function Login({setLoginToken}) {

    const saveTokenToSecureStorage = (_token) => {
        SecureStore.setItemAsync('token', _token).then(() => {
            setLoginToken(_token);
        });
    };

    const addUserToDatabase = (object) => {
        // check if user id exists in database
        const docRef = doc(db, "users", object.id);
        getDoc(docRef).then((docSnap) => {
            // if user does not exist, create document in database
            if (!docSnap.exists()) {
                setDoc(doc(db, 'users', object.id), {
                    id: object.id,
                    name: object.name,
                    classes: []
                });
            }
        }).catch((err) => {
            console.log("Error getting docSnap: ", err);
        });
    };
    
    const login = async () => {
        try {
            // attempt facebook login
            await Facebook.initializeAsync({appId: '918414992436403', appName: 'Collate'})
            const { type, token } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile']
            })
        
            // if login is successful
            if(type === 'success') {
                // get information from the token
                fetch(`https://graph.facebook.com/me?access_token=${token}`).then((response) => {
                    response.json().then( (object) => {
                        // add user to database if record does not exist
                        addUserToDatabase(object);
                    }).catch((err) => {
                        console.log("Error getting json object: ", err);
                    });
                }).catch((err) => {
                    console.log("Error fetching token information: ", err);
                });

                // save token to storage ("cache")
                saveTokenToSecureStorage(token);
            }
        } catch(err) {
            console.log("Error logging in: ", err);
        }
    };

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