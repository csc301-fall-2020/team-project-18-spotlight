import React, { useState } from 'react';
import { Text, SafeAreaView, Button, StyleSheet} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import CustomCalendar from '../components/CustomCalendar'
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';


const CalendarScreen = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState()
    
    const updateSelectedDate = (date) => {
      setSelectedDate(date)
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Workouts</Text>
            <Button
                title="Add Workout"
                color="#A20A0A"
                onPress={() =>
                    navigation.navigate('Add Workout', { day: selectedDate})}
                />
            <CustomCalendar updateSelected={updateSelectedDate}/>
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
  });

export default CalendarScreen;
  