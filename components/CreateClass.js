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

    const addClass = async (className) => {
        if(!items.includes({label: className, value: className})) {
            try{
                var myNotes = await AsyncStorage.getItem('@mynotes'); // getting all existing notes

                myNotes = JSON.parse(myNotes);

                myNotes[className] = { // text = new class name
                    notes: []
                }

                await AsyncStorage.setItem('@mynotes', JSON.stringify(myNotes));
                    
                myNotes = await AsyncStorage.getItem('@mynotes');
                console.log(myNotes);
            } catch (error) {
                console.log(error)
            }
        }
        onChangeText("");
    }
    
    useEffect(() => {
        const getClasses = async () => {
            var myNotes;
            
            try {
                myNotes = await AsyncStorage.getItem('@mynotes');
                if(myNotes === null) {
                    throw Error("My Notes JSON not defined");
                }
            } catch (error) {
                console.log(error)
            }

            myNotes = await JSON.parse(myNotes);
            console.log(myNotes);
            let categories = Object.keys(myNotes);

            categories.map((category) => {
                setItems(oldItems => [...oldItems, {label: category, value: category}]);
            })
        }
        getClasses()
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Classes</Text>
            </View>
            <View style={styles.div}>
                <Text style={styles.subtitle}>Create a New Class</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
                <Button
                    title="Create Class"
                    style={styles.button}
                    onPress={() => addClass(text)}
                />
            </View>
            <View style={styles.div}>
                <Text style={styles.subtitle}>Select Existing Class</Text>
                <DropDownPicker
                    style={styles.dropDown}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    // dropDownDirection="TOP"
                />
                <Button
                    title="Create Note"
                    style={styles.button}
                    onPress={() => addClass(text)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        marginTop: '15%',
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
        backgroundColor: 'blue',
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: 'white',
    },
    subtitle: {
        fontWeight: '500',
        fontSize: 20,
        marginBottom: '4%',
        textAlign: 'center'
    },
    div: {
        marginTop: '10%',
        paddingLeft: '5%',
        paddingRight: '5%',
        height: '15%'
    },
    dropDown: {
        borderColor: 'blue',
        borderRadius: 30,
        backgroundColor: 'white',
        paddingLeft: '5%',
        paddingRight: '5%',
        // drop down menu showing up transparent, zindex/backgroundcolor/elevation fix not working
    },
    input: {
        borderWidth: 1,
        borderColor: 'blue',
        height: '35%',
        borderRadius: 30,
        paddingLeft: '5%',
    },
    button: {
        // you can't style Button, switch to Pressable/Touchable
    },
})