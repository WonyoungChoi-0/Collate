import React from 'react';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, ScrollView, SectionList, SafeAreaView, FlatList } from 'react-native';
import mynotes from "../mynotes.json"
import { render } from 'react-dom';


export default function MyNotes(){
   const [mydata, setMyData] = useState([]);
   const [categories, setCategories] = useState([]);
   getData().then(function getNotes(value){
       updateMyData(value);
    }).then(() => {return element})

    function updateMyData(data){
        setMyData(data);
        setCategories(Object.keys(mydata));
    }

    const element = (
        <SafeAreaView>
        <ScrollView>
        <Text style={styles.heading}>My Notes</Text>
        <GetNotesSection categories={categories} data={mydata}/>
        </ScrollView>
        </SafeAreaView>
    );
    
    return element;

}

const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@mynotes')
      let parsedData =  JSON.parse(jsonValue);
      return parsedData;
    } catch(e) {
        console.log("error saving value")
    }
  }

  const getNotes = async(data, category) => {
      const notes = await data[category]["notes"]
      return notes;
  }
  

function GetNotesSection(props){ 

    return (
        props.categories.map(
            function(category){
                return (
                <SectionList sections = {[
                    {title: {category}, data: props.data[category]["notes"]}
                ]} 
                renderItem = {
                    ({item}) =>
                    (   <View style={styles.noteCard}>
                            <Text style={styles.noteTitle}>{item["Title"]}</Text>
                            <ScrollView style={styles.noteContent}>
                                <Text>{item["Content"]}</Text>
                            </ScrollView>
                        </View>
                        
                    )
                }
                renderSectionHeader = {
                    ({section}) => (
                        <Text style={styles.sectionText}>{section["title"]["category"]}</Text>
                    )
                }
                contentContainerStyle = {styles.categoryCard}
                />
                )
            }
        )
    )
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
    sectionText: {
        fontWeight: "200",
        borderColor: '#EDB2B2',
        borderWidth: 1,
        fontSize: 30,
        width: '100%'
    },
    noteTitle: {
        fontWeight: "bold"
    },
    noteContent: {
        display: 'flex',
        flexWrap: 'wrap', 
        width: '100%',
    },
    categoryCard: {
        paddingTop: '15%',
        borderColor: '#EDB2B2',
        borderWidth: 1
    },
    noteCard: {
        backgroundColor: 'rgba(237, 178, 178, 0.45)',
        borderWidth: 2,
        borderColor: 'white'
    }
});