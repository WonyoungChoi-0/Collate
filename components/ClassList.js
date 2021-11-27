import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Pressable, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 

import { db } from '../config/firebase';
import { GlobalStyles, primaryColor, buttonColor } from '../GlobalStyles';

export default function ClassList({ navigation }) {

    const [newClassName, setNewClassName] = useState('');
    const [classNames, setClassNames] = useState([]);
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
                setClassNames(temp);
            })
        }
    }, [userId]);

    const addClass = async () => {
        if (classNames.includes(newClassName)) {
            alert('This class already exists');
        } else {
            if (newClassName) {
                const classData = {
                    name: newClassName,
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
                    setClassNames([...classNames, newClassName]);
                }) 
                
                setNewClassName('');
            } 
        }
    };
    
    return (
        <View style={GlobalStyles.container}>
            <View style={styles.inputContainer}>
                {/* <Text>Create a New Class</Text> */}
                <TextInput
                    style={styles.input}
                    placeholder='Enter new class name'
                    onChangeText={setNewClassName}
                    value={newClassName}
                />
                <Pressable 
                    style={GlobalStyles.button} 
                    onPress={() => addClass()}
                >
                    <Text style={GlobalStyles.buttonText}>
                        Add Class
                    </Text>
                </Pressable>
            </View>
            <ScrollView style={styles.listContainer}>
                {classNames.map((name) => {
                    return (
                        <Pressable
                            key={`classcard-${name}`}
                            onPress={() => {
                                navigation.navigate('Notes', {className: name})
                            }}
                        >
                            <View style={styles.card}>
                                <Text style={styles.cardText}>
                                    {name}
                                </Text>
                            </View>
                        </Pressable>
                    )
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        display: 'flex',
        height: '25%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
    },
    input: {
        height: 60,
        width: '100%',
        fontSize: 16,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'white',
    },
    listContainer: {
        height: '75%',
        padding: 30,
        backgroundColor: 'white',
    },
    card: {
        minHeight: 50,
        backgroundColor: primaryColor,
        marginBottom: 20,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 3,
        borderRadius: 1, 
        display: 'flex',
        justifyContent: 'center',
        padding: 20,
    },
    cardText: {
        color: 'white',
        fontSize: 16,
    }
});