import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Icon } from 'react-native-elements'

import { GlobalStyles, primaryColor, secondaryColor } from '../GlobalStyles';

export default function Account({setLoginToken}) {

    const [name, setName] = useState("");

    useEffect(() => { // gets name of current user
        SecureStore.getItemAsync('token').then((token) => {
            fetch(`https://graph.facebook.com/me?access_token=${token}`).then((response) => {
                response.json().then((object) =>{
                    setName(object.name);
                });
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    const logout = async () => {
        await SecureStore.deleteItemAsync('token').then(() => {
            setLoginToken(undefined);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>
                    Logged in as
                </Text>
                <Text style={styles.name}>
                    {name}
                </Text>
                <Icon
                    size={150}
                    name='user-circle'
                    type='font-awesome-5'
                    color={primaryColor}
                    solid
                />
            </View>
            <View style={GlobalStyles.action}>
                <Pressable 
                    style={GlobalStyles.button} 
                    onPress={() => logout()}
                >
                    <Text style={GlobalStyles.buttonText}>
                        Logout
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
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
    },
    name: {
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 40,
    },
});