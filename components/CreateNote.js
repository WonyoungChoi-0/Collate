import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { db } from '../config/firebase';
import { GlobalStyles } from '../GlobalStyles';

export default function CreateNote({ route, navigation }) {
  const [title, onChangeTitle] = useState('');
  const [note, onChangeNote] = useState('');
  const [userId, setUserId] = useState();

  const { className, notes, setNotes } = route.params;

  useEffect(() => { 
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
  }, [])

  const storeNote = async (title, note) => {
    const noteData = {
      title: title,
      content: note
    }

    const docRef = await doc(db, 'users', userId);
    getDoc(docRef).then((docSnap) => {
      let classes = docSnap.get('classes');
      classes.forEach((course) => {
        if(course.name === className) {
          course.notes.push(noteData);
        }
      });

      updateDoc(docRef, {
        'classes' : classes
      });

      setNotes([...notes, noteData]);
    });

    onChangeTitle('');
    onChangeNote('');
  }

  return (
    <View>
      <TouchableOpacity 
        onPress={ () => {
          storeNote(title, note);
          navigation.goBack();
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