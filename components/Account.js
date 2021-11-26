// display name, statistics, logout button

import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

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
        <View>
            <Text>Logged in as {name} </Text>
            <Button 
                title="Logout" 
                onPress={() => logout()}
            />
        </View>
    );
}