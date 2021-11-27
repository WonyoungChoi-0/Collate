import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { db } from '../config/firebase';
import { GlobalStyles, primaryColor } from '../GlobalStyles';

export default function CreateNote({ route, navigation }) {
  const [title, onChangeTitle] = useState('');
  const [note, onChangeNote] = useState('');
  const [userId, setUserId] = useState();

  const { className, notes, setNotes } = route.params;

  navigation.setOptions({ title: 'Create Note' });

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
    if(title === '') {
      alert('Title is required');
      return;
    }

    if(note === '') {
      alert('Note is required');
      return;
    }

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
    navigation.goBack();
  }

  return (
    <View styles={GlobalStyles.container}>
      <View styles={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.title]}
          onChangeText={title => onChangeTitle(title)}
          placeholder='Title'
          autoFocus={true}
          value={title}
        />
        <TextInput
          style={[styles.input, styles.content]}
          onChangeText={note => onChangeNote(note)}
          placeholder='Enter your notes here...'
          multiline={true}
          enablesReturnKeyAutomatically={true}
          value={note}
        />
      </View>
      <View style={styles.action}>
        <Pressable 
          style={GlobalStyles.button} 
          onPress={() => {
            storeNote(title, note);
          }}
        >
          <Text style={GlobalStyles.buttonText}>
            Done
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
      fontSize: 16,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: 'white',
  },
  title: {
    margin: 20,
    minHeight: 60,
  },
  content: {
    margin: 20,
    marginTop: 0,
    height: 250,
    paddingTop: 20,
    paddingBottom: 20
  },
  inputContainer: {
    margin: 20,
  },
  action: {
    display: 'flex',
    alignItems: 'center'
  }
});