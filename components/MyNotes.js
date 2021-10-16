import React from 'react';
import { StyleSheet, Text, View, ScrollView, SectionList, SafeAreaView } from 'react-native';
import mynotes from "../mynotes.json"


export default function MyNotes(){
    return (
        <SafeAreaView>
        <GetNotesSection/>
        </SafeAreaView>
    );
}

function GetNotesSection(){
    var categories = Object.keys(mynotes);
    return (
        categories.map(
            function(category){
                return (
                <SectionList sections = {[
                    {title: {category}, data: mynotes[category]["notes"]}
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
        height: '15px'
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