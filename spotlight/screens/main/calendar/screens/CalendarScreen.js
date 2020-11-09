import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import CustomCalendar from '../components/CustomCalendar'


const CalendarScreen = () => {
    
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Workouts</Text>
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
        paddingTop: "4%",
        paddingBottom: "1%",
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  });

export default CalendarScreen;
  