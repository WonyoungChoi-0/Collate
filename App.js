import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import MyNotes from "./components/MyNotes.js";
import CreateClass from './components/CreateClass.js';
import CreateNote from './components/CreateNote.js';

export default function App() {
  return (
    // <SafeAreaView style={styles.container}>
    //   <ScrollView>
    //   <Text style={styles.heading}>My Notes</Text>
    //   <StatusBar style="auto" />
    //   <MyNotes/>
    //   </ScrollView>
    // </SafeAreaView>

    <CreateClass/>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 68,
    fontWeight: '500',
    backgroundColor: '#EDB2B2',
    height: '15%',
    textAlign: 'center',
    width: '100%',
  },

  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'start',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '100%'
  },
});
