import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateNote from './components/CreateNote';
import Account from './components/Account';
import ClassList from './components/ClassList';
import NotesList from './components/NotesList';
import { Icon } from 'react-native-elements'


export default function App() {
  
  const [loginToken, setLoginToken] = useState(null);

  useEffect(() => {
    SecureStore.getItemAsync('token').then((res) => {
      setLoginToken(res);
    })
  }, [])

  const Stack = createNativeStackNavigator();

  const ClassStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Classes' component={ClassList}/>
        <Stack.Screen name='Notes' component={NotesList}/>
        <Stack.Screen name='Create' component={CreateNote}/>
      </Stack.Navigator>
    );
  }

  const Tab = createBottomTabNavigator();

  return (
    loginToken? 
      <NavigationContainer>
        <Tab.Navigator initalRouteName='MyNotes'>
          <Tab.Screen 
            name='Class List' 
            component={ClassStack} 
            options={{headerShown: false, tabBarIcon: (tabInfo) => (
              <Icon name='list-ul' type='font-awesome-5'/>
            )}}
          />
          <Tab.Screen 
            name='Account' 
            children={() => <Account setLoginToken={setLoginToken}/>} 
            options={{ tabBarIcon: (tabInfo) => (
              <Icon name='user-circle' type='font-awesome-5'/>
            )}}
          />
        </Tab.Navigator>
      </NavigationContainer>
      : <Login setLoginToken={setLoginToken}/>
  );
}