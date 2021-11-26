import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyNotes from './components/MyNotes';
import CreateClass from './components/CreateClass';
import CreateNote from './components/CreateNote';
import Logout from './components/Logout';

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
          <Tab.Screen name='MyNotes' component={MyNotes} />
          <Tab.Screen name='CreateClass' component={CreateClass} />
          <Tab.Screen name='CreateNote' component={CreateNote} />
          <Tab.Screen name='Account' children={() => <Logout setLoginToken={setLoginToken}/>} />
        </Tab.Navigator>
      </NavigationContainer>
      : <Login setLoginToken={setLoginToken}/>
  );
}