import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateClass(){

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [text, onChangeText] = useState("");
    
    useEffect(() => {
        const getClasses = async () => {
            var myNotes;

            const data = {
                'Mobile App Development': 'world',
                'Machine Learning': 'hello'
            };

            //Testing 
            try {
                await AsyncStorage.setItem('@mynotes', JSON.stringify(data));
            } catch (error) {
                console.log(error);
            }

            try {
                myNotes = await AsyncStorage.getItem('@mynotes');
                if(myNotes === null) {
                    throw Error("My Notes JSON not defined");
                }
            } catch (error) {
                console.log(error)
            }

            myNotes = await JSON.parse(myNotes);
            let categories = Object.keys(myNotes);

            categories.map((category) => {
                setItems(oldItems => [...oldItems, {label: category, value: category}]);
            })
        }
        getClasses()
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create a New Class</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            />
            <Button
                title="Create"
                onPress={() => Alert.alert('Simple Button pressed')}
            />
            <Text style={styles.header}>Select a Class</Text>
            <DropDownPicker
                style={styles.dropDown}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '50%',
    },
    header: {
        fontSize: 30,
        margin:  'auto',
        textAlign: 'center',
        marginTop: '5%'
    },
    dropDown: {

    },
    input: {
        borderWidth: 1,
        marginBottom: '1%'
    }
})