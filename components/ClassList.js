import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 

import { db } from '../config/firebase';
import { GlobalStyles } from '../GlobalStyles';

export default function ClassList({ navigation }) {

    const [newClass, setNewClass] = useState('');
    const [classes, setClasses] = useState([]);
    const [userId, setUserId] = useState();

    useEffect(() => { 
        // get userId from token
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
    }, []);

    useEffect(() => {
        if (userId) {
            // get reference to user in database
            getDoc(doc(db, 'users', userId)).then((docSnap) => {
                let temp = [];
                docSnap.get('classes').forEach((classObj) => {
                    temp.push(classObj.name);
                })
                // update class list
                setClasses(temp);
            })
        }
    }, [userId]);

    const addClass = async () => {
        if (classes.includes(newClass)) {
            alert('This class already exists');
        } else {
            if (newClass) {
                const classData = {
                    name: newClass,
                    color: 'red',
                    notes: []
                }
    
                // get user document
                const docRef = await doc(db, 'users', userId);
                getDoc(docRef).then((docSnap) => {
                    // get existing classes
                    const temp = docSnap.get('classes');
                    temp.push(classData);

                    // update the list of classes to include new class
                    updateDoc(docRef, {
                        'classes': temp
                    });
                }).then(() => {
                    setClasses([...classes, newClass]);
                }) 
                
                setNewClass('');
            } 
        }
    };
    
    return (
        <View>
            <View id='create-class'>
                <Text>Create a New Class</Text>
                <TextInput
                    onChangeText={setNewClass}
                    value={newClass}
                />
                <Button
                    title='Create Class'
                    onPress={() => {
                        addClass();    
                    }}
                />
            </View>
            <View>
                {classes.map((name) => {
                    return <Button 
                        title={name} key={name}
                        onPress={() => {
                            navigation.navigate('Notes', {className: name})}}
                             />
                })}
            </View>
        </View>
    );
}