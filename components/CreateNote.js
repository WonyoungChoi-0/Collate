import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GlobalStyles } from '../GlobalStyles';

// Stores the data as a JSON file using AsyncStorage
const storeData = async (title, note) => {

  let className;

  try {
    className = await AsyncStorage.getItem('@class')
  } catch (e) {
    console.log(e);
  }

  try {
    let mynotes = await AsyncStorage.getItem('@mynotes');

    mynotes = JSON.parse(mynotes);

    const noteJSON = {
      'key': mynotes[className]['notes'].length+1,
      'title': title,
      'content': note,
      'created': new Date().getTime()
    }

    mynotes[className]['notes'].push(noteJSON);

    console.log(mynotes);

    mynotes = JSON.stringify(mynotes);

    await AsyncStorage.setItem('@mynotes', mynotes);
  } catch (e) {
    console.log(e);
  }
}

export default function CreateNote({ className, navigation }) {
  const [title, onChangeTitle] = React.useState('');
  const [note, onChangeNote] = React.useState('');

  return (
    <View>
      <TouchableOpacity 
        onPress={ () => {
          storeData(title, note);
          onChangeTitle('');
          onChangeNote('');
          navigation.navigate('MyNotes');
        }}
      >
        <Text>Done</Text>
      </TouchableOpacity>
      <TextInput
        onChangeText={title => onChangeTitle(title)}
        placeholder='Title'
        placeholderTextColor='grey'
        autoFocus={true}
        value={title}
     />
     <TextInput
        onChangeText={note => onChangeNote(note)}
        placeholder='Notes'
        placeholderTextColor='grey'
        multiline={true}
        enablesReturnKeyAutomatically={true}
        value={note}
     />
    </View>
  );
}