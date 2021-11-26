import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateNote from './components/CreateNote';
import Account from './components/Account';
import ClassList from './components/ClassList';
import NotesList from './components/NotesList';

export default function App() {
  
  const [loginToken, setLoginToken] = useState(null);

  useEffect(() => {
    SecureStore.getItemAsync('token').then((res) => {
      setLoginToken(res);
    })
  }, [])

  const Tab = createBottomTabNavigator();

  return (
    loginToken?
      <NavigationContainer>
        <Tab.Navigator initalRouteName='MyNotes'>
          <Tab.Screen name='Class List' component={ClassList} />
          <Tab.Screen name='Class Notes' component={NotesList} />
          <Tab.Screen name='Create Note' component={CreateNote} />
          <Tab.Screen name='Account' children={() => <Account setLoginToken={setLoginToken}/>} />
        </Tab.Navigator>
      </NavigationContainer>
      : <Login setLoginToken={setLoginToken}/>
  );
}