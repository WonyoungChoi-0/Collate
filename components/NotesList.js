import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';

import { GlobalStyles } from '../GlobalStyles';

export default function NoteList({route, navigation}) {

    const [notes, setNotes] = useState([]);

    const { className } = route.params;
    
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