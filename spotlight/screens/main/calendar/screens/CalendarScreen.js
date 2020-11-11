import React, { useState } from 'react';
import { Text, SafeAreaView, Button, StyleSheet} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import CustomCalendar from '../components/CustomCalendar'
import { NavigationContainer } from '@react-navigation/native';


const CalendarScreen = ({ navigation }) => {
    
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Workouts</Text>
            <Button
                title="Add Workout"
                color="#A20A0A"
                onPress={() =>
                    navigation.navigate('Add Workout')}
                />
            <CustomCalendar />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header:{
        fontFamily: "Raleway_600SemiBold",
        fontSize: 30,
        fontStyle: "normal",
        textAlign: "center",
        paddingTop: "16%"
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
  });

export default CalendarScreen;
  