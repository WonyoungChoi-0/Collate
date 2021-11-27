import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { GlobalStyles } from '../GlobalStyles';
import * as SecureStore from 'expo-secure-store';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { db } from '../config/firebase';

export default function NoteList({route, navigation}) {

    const [notes, setNotes] = useState([]);
    const [userId, setUserId] = useState();
    const { className } = route.params;
    
    useEffect(() => { 
        // get list of notes for given class id (and user id?)
        // setNotes(res)
        // get class by id
        // setClassName(res)
        navigation.setOptions({ title: className })

        SecureStore.getItemAsync('token')
            .then((token) => {
                fetch(`https://graph.facebook.com/me?access_token=${token}`)
                    .then((response) => {
                        response.json().then((obj) => {
                            setUserId(obj.id);
                        }).catch((err) => {
                            console.log('Error getting response: ', err);
                        })
                    }).catch((err) => {
                        console.log('Error fetching token: ', err);
                    });
            }).catch((err) => {
                console.log('Error accessing SecureStore ', err);
            });
    }, [])

    useEffect(() => {
        if (userId) {
            // get reference to user in database
            getDoc(doc(db, 'users', userId)).then((docSnap) => {
                let temp = [];
                docSnap.get('classes').forEach((classObj) => {
                    if(classObj.name === className) {
                        temp = classObj.notes;
                    }
                })
                // update notes list
                setNotes(temp);
            })
        }
    }, [userId]);
    
    return (
        <View>
            <Text>{className}</Text>
            <Button 
                title='Create Note' 
                onPress={() => {
                    navigation.navigate('Create', {className: className})
                }}
            />
            {notes.map((note) => {
                <View>
                    <Text>{note.title}</Text>
                    <Text>{note.text}</Text>
                </View>
            })}
        </View>
    )
}