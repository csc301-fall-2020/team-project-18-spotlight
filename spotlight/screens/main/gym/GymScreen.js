import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen'
import GymInfo from './screens/GymInfo'

const GymStack = createStackNavigator()

const GymScreen = () => {
    return (
        <GymStack.Navigator
        screenOptions={{
            headerShown:false
        }}>
            <GymStack.Screen name="Gym Stack" component={MapScreen}/>
            <GymStack.Screen name="Gym info" component={GymInfo}/>
        </GymStack.Navigator>
    )
}


export default GymScreen;

