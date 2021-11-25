import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import MyNotes from "./MyNotes.js";
import CreateClass from './CreateClass.js';
import CreateNote from './CreateNote.js';
import mynotes from "../mynotes.json";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  initializeData(mynotes);
  return (
    <NavigationContainer>
      <Tab.Navigator initalRouteName="MyNotes">
        <Tab.Screen name="MyNotes" component={MyNotes} />
        <Tab.Screen name="CreateClass" component={CreateClass} />
        <Tab.Screen name="CreateNote" component={CreateNote} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const initializeData = async (data) => {
  let key = '@mynotes';
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log("Error Saving Data");
    console.log(e);
  }
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
    marginTop: 100,
  },
});
