import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const generateHash = (title, note) => {
  return `${ title }_${ new Date().getTime() }_${ note }`;
}

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
        enablesReturnKeyAutomatically={true}
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
