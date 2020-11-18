import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, Button} from "react-native";

const WorkoutDetails = (props) => {
    const [muscles, onChangeItem] = React.useState('abs')
    const [title, onChangeText] = React.useState('');
    return (
        <View style={styles.container}>
          <Text style={styles.header}>
              {props.muscle}
          </Text>

          <View
                style={{
                    flexDirection: "row",
                    height: 50,
                    width: 300,
                }}
                >
                    <Text style={{flex: 0.6, textAlign: 'center'}}>Title</Text>
                    <Text style={{flex: 0.2, textAlign: 'center'}}>Rep</Text>
                    <Text style={{flex: 0.2, textAlign: 'center'}}>Lbs</Text>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    height: 50,
                    width: 300,
                }}
                >
                <View style={{ flex: 0.6 }}>
                    <TextInput 
                        style={styles.input}
                        onChangeText={text => onChangeText(text)}
                        value={title}/>
                </View>
                <View style={{ flex: 0.2 }}>
                    <TextInput 
                        style={styles.input}
                        onChangeText={text => onChangeText(text)}
                        value={title}/>
                </View>
                <View style={{ flex: 0.2 }}>
                    <TextInput 
                        style={styles.input}
                        onChangeText={text => onChangeText(text)}
                        value={title}/>
                </View>
            </View>

            <TouchableHighlight
                style={styles.button}>
                <Text style={styles.textStyle}>Add Exercise</Text>
            </TouchableHighlight>
        </View>
      );
}

const styles = StyleSheet.create({
    header:{
        fontFamily: "Raleway_600SemiBold",
        fontSize: 30,
        fontStyle: "normal",
        textAlign: "left",
        color: '#fff'
    },
    container: {
        flex: 1,
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 5,
        marginBottom: 10
      },
    input: { 
        borderColor: '#d3d3d3', 
        borderWidth: 1,
        backgroundColor: "#fafafa",
        borderRadius: 5,
        height: 30,
        margin: 5
    },
    button: {
        backgroundColor: "#000",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
})

export default WorkoutDetails;