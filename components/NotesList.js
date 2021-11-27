import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Pressable } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { GlobalStyles, primaryColor, secondaryColor, buttonColor } from '../GlobalStyles';
import * as SecureStore from 'expo-secure-store';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { db } from '../config/firebase';
import { Icon } from 'react-native-elements'

export default function NoteList({route, navigation}) {

    const [notes, setNotes] = useState([]);
    const [userId, setUserId] = useState();
    const { className } = route.params;
    const [activeSections, setActiveSections] = useState([]);

    navigation.setOptions({ title: className });

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

    useEffect(() => {
        if (userId) {
            // get reference to user in database
            getDoc(doc(db, 'users', userId)).then((docSnap) => {
                let temp = [];
                docSnap.get('classes').forEach((classObj) => {
                    if(classObj.name === className) {
                        temp = classObj.notes;
                    }
                })
                // update notes list
                setNotes(temp);
            })
        }
    }, [userId]);

    const _renderHeader = (section) => {
        return (
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
                {section.title}
            </Text>
            <Icon name='expand-more' type='material-icons'/>
          </View>
        );
      };
    
    const _renderContent = (section) => {
        return (
          <View style={styles.contentContainer}>
            <Text>{section.content}</Text>
          </View>
        );
      };
    
    return (
        <View style={GlobalStyles.container}>
            <View style={styles.topContainer}>
                <Pressable 
                    style={GlobalStyles.button} 
                    onPress={() => 
                        navigation.navigate('Create', {className: className, notes: notes, setNotes: setNotes})
                    }
                >
                    <Text style={GlobalStyles.buttonText}>
                        Create Note
                    </Text>
                </Pressable>
            </View>
            {notes && 
                <Accordion
                    sections={notes}
                    activeSections={activeSections}
                    touchableComponent={TouchableOpacity}
                    expandMultiple={true}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                    duration={400}
                    onChange={setActiveSections}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    topContainer: {
        display: 'flex',
        height: '15%',
        alignItems: 'center',
        padding: 30,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'white',
        minHeight: 50,
        padding: 20,
    },
    headerText: {
        fontSize: 16,
        color: primaryColor,
        fontWeight: '600',
    },
    contentContainer: {
        padding: 20,
        paddingTop: 10,
    }
});