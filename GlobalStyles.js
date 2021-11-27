import React from 'react';
import { StyleSheet } from 'react-native';

export const primaryColor = '#F95651';
export const secondaryColor = '#F9AD74';
export const buttonColor = '#4287f5';

export const GlobalStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  button: {
    borderStyle: 'solid',
    borderRadius: 20, 
    borderColor: buttonColor,
    borderWidth: 1,
    height: 40,
    width: 250,
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center'
  },
  buttonText: {
    textTransform: 'uppercase',
    color: buttonColor,
    fontWeight: 'bold',
  },
  action: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
  },
});