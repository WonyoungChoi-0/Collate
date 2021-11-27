import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import * as Facebook from 'expo-facebook'
import * as SecureStore from 'expo-secure-store'
import { setDoc, doc, getDoc } from "firebase/firestore"; 
import { Icon } from 'react-native-elements'

import { db } from '../config/firebase'
import { GlobalStyles, primaryColor, buttonColor } from '../GlobalStyles';

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
            <View style={styles.header}>
                <View>
                    <Text style={styles.welcome}>
                        Welcome to
                    </Text>
                    <Text style={styles.logo}>
                        Collate
                    </Text>
                </View>
                <Icon
                    size={100}
                    name='sticky-note-2'
                    type='material-icons'
                    color='white'
                />
            </View>
            <View style={GlobalStyles.action}>
                <Pressable 
                    style={GlobalStyles.button} 
                    onPress={() => login()}
                >
                    <Text style={GlobalStyles.buttonText}>
                        Login With Facebook
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        height: '50%',
        backgroundColor: primaryColor,
    },
    welcome: {
        fontSize: 30,
        marginBottom: 20,
        color: 'white',
        fontWeight: '300',
    },
    logo: {
        fontSize: 50,
        color: 'white',
        fontWeight: '600',
    },
});