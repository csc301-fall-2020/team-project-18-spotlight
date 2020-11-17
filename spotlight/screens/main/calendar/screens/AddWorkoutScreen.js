import React, { useState } from 'react';
import { TouchableHighlight, TextInput, Text, View, Button, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

/**TODO: Move the "add exercise" form into another file to be its own component, each time the button is clicked the state with title, muscle type, reps and so on will be sent 
 * back to this screen, which creates a list of these exercises.
 */
const AddWorkoutScreen = ({navigation}) => {
    const [muscles, onChangeItem] = React.useState('abs')
    const [title, onChangeText] = React.useState('Exercise Name');
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Add Workout!
            </Text>
            <Button
                title="Back"
                color="#A20A0A"
                onPress={() =>
                    navigation.navigate('Calendar Stack')}
                />

            
            <View
                style={{
                    flexDirection: "row",
                    height: 50,
                    width: 300,
                }}
                >
                    <Text style={{flex: 0.4, textAlign: 'center'}}>Title</Text>
                    <Text style={{flex: 0.4, textAlign: 'center'}}>Muscles</Text>
                    <Text style={{flex: 0.1, textAlign: 'center'}}>Rep</Text>
                    <Text style={{flex: 0.1, textAlign: 'center'}}>Lbs</Text>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    height: 50,
                    width: 300,
                }}
                >
                <View style={{ flex: 0.4 }}>
                    <TextInput 
                        style={styles.input}
                        onChangeText={text => onChangeText(text)}
                        value={title}/>
                </View>
                <View style={{ flex: 0.4 }}>
                    <DropDownPicker
                        items={[
                            {label: 'Abs', value: 'abs', hidden: true},
                            {label: 'Biceps', value: 'biceps'},
                            {label: 'Glutes', value: 'glutes'}
                        ]}
                        defaultValue={ muscles }
                        style={styles.input}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={item => onChangeItem(item.value)}
                    />
                </View>
            </View>

            <TouchableHighlight
                style={styles.button}>
                <Text style={styles.textStyle}>Add Exercise</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        fontFamily: "Raleway_600SemiBold",
        fontSize: 30,
        fontStyle: "normal",
        textAlign: "center",
        paddingTop: "21%"
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    block: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: "5%",
        margin: "5%",
      },
    description:{
        fontFamily: "Raleway_600SemiBold",
        textAlign: "center",
        marginBottom: "5%",
        paddingLeft: "3%",
    },
    top: {
        flex: 0.3,
        backgroundColor: "#d3d3d3",
        borderRadius: 10,
    },
    middle: {
        flex: 0.3,
        backgroundColor: "#d3d3d3",
        borderRadius: 10,
    },
    bottom: {
        flex: 0.3,
        backgroundColor: "#d3d3d3",
        borderRadius: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
    input: { 
        borderColor: '#d3d3d3', 
        borderWidth: 1,
        backgroundColor: "#fafafa",
        borderRadius: 5,
        height: 30,
        margin: 5
    },
  });

export default AddWorkoutScreen;