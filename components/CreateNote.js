import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Creates a hash key for using the title, note and current time
const generateHash = (title, note) => {
  return `${ title }_${ new Date().getTime() }_${ note }`;
}

// Stores the data as a JSON file using AsyncStorage
const storeData = async (title, note) => {
  const data = {
      'title': title,
      'note': note
    };

  let key = generateHash(title, note);
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log("Error Saving Data");
    console.log(e);
  }
}

export default function CreateNote() {
  const [title, onChangeTitle] = React.useState('');
  const [note, onChangeNote] = React.useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={ styles.doneButton }
        onPress={ () => {
          storeData(title, note);
          onChangeTitle('');
          onChangeNote('');
        }}
      >
        <Text style={ styles.doneText }>Done</Text>
      </TouchableOpacity>
      <TextInput
        style={ styles.titleBar }
        onChangeText={title => onChangeTitle(title)}
        placeholder='Title'
        placeholderTextColor='grey'
        autoFocus={true}
        value={title}
     />
     <TextInput
        style={ styles.noteField }
        onChangeText={note => onChangeNote(note)}
        placeholder='Notes'
        placeholderTextColor='grey'
        multiline={true}
        enablesReturnKeyAutomatically={true} // I added this in otherwise there is an error where the user cannot reaccess the note prompt
        value={note}
     />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    padding: 25,
  },
  doneButton: {
    alignSelf: 'flex-end',
  },
  doneText: {
    color: '#007AFF',
    fontSize: 20
  },  
  titleBar: {
    height: 50,
    fontSize: 40,
    justifyContent: 'flex-start',
  },
  noteField: {
    marginTop: 10,
    fontSize: 20,
  }
});