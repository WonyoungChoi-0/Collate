// display list of classes (as clickable cards), field to enter new class to list
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { collection, doc, addDoc, setDoc } from "firebase/firestore"; 
import { db } from '../config/firebase'

export default function ClassList() {

    const [newClass, setNewClass] = useState("");
    const [classes, setClasses] = useState([]);

    useEffect(() => { 
        // get list of classes from database
        // setClasses(res)
    }, [])

    const addClass = () => {
        // adds new class to firebase 
        // ... 
        setNewClass("");
    }
    
    return (
        <View>
            <View id='create-class'>
                <Text>Create a New Class</Text>
                <TextInput
                    onChangeText={setNewClass}
                    value={newClass}
                />
                <Button
                    title="Create Class"
                    onPress={() => {
                        addClass();    
                    }}
                />
            </View>
            <View>
                {classes.map((classObj) => {
                    <Button
                        title={classObj.name}
                        onPress={() => {
                            // navigate to notes list
                            // stack navigation 
                        }}
                    />
                })}
            </View>
        </View>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     input: {
        
//     }
// });