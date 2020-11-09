import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from './screens/CalendarScreen'
import AddWorkoutScreen from './screens/AddWorkoutScreen'

const CalendarStack = createStackNavigator()

const CalendarNav = () => {
    return (
        <CalendarStack.Navigator
        screenOptions={{
            headerShown:false
        }}>
            <CalendarStack.Screen name="Calendar Stack" component={CalendarScreen}/>
            <CalendarStack.Screen name="Add Workout" component={AddWorkoutScreen}/>
        </CalendarStack.Navigator>

    )
}

export default CalendarNav;