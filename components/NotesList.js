// display all notes for given class (title, text), link to create a note
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function NoteList({classId}) {

    const [notes, setNotes] = useState([]);
    const [className, setClassName] = useState("");
    
    useEffect(() => { 
        // get list of notes for given class id (and user id?)
        // setNotes(res)
        // get class by id
        // setClassName(res)
    }, [])
    
    return (
        <View>
            <Text>{className}</Text>
            <Button 
                title='Create Note' 
                onPress={() => {
                    // navigate to Create Note page, prepopulate class
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