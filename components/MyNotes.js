import React from 'react';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, ScrollView, SectionList, SafeAreaView, FlatList } from 'react-native';
import mynotes from "../mynotes.json"
import { render } from 'react-dom';

export default function MyNotes() {

    const [myData, setMyData] = useState([]); // json object of json classes and notes
    const [categories, setCategories] = useState([]); // class names

    // unused function
    // function updateMyData(data){
    //     setMyData(data);
    //     setCategories(Object.keys(mydata));
    // }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@mynotes')
            return await JSON.parse(jsonValue);
        } catch(e) {
            console.log("error getting data")
        }
    }

    const getNotes = async(data, category) => {
        return await data[category]["notes"]
    }

    useEffect(() => {
        getData().then(function getNotes(value) {
            setMyData(value);
            setCategories(Object.keys(myData));
         })
    }, [myData]);

    return (
        <SafeAreaView>
            <ScrollView>
                <Text style={styles.heading}>My Notes</Text>
                <GetNotesSection categories={categories} data={myData}/>
            </ScrollView>
        </SafeAreaView>
    );
}



//   const getNotes = async(data, category) => {
//       const notes = await data[category]["notes"]
//       return notes;
//   }
  

function GetNotesSection(props){ 

    return (
        props.categories.map(
            function(category){
                console.log(category);
                return (
                <SectionList sections = {[
                    {title: {category}, data: props.data[category]["notes"]}
                ]} 
                renderItem = {
                    ({item}) =>
                    (   <View style={styles.noteCard}>
                            <Text style={styles.noteTitle}>{item["title"]}</Text>
                            <ScrollView style={styles.noteContent}>
                                <Text>{item["content"]}</Text>
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