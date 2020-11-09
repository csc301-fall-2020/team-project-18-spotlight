import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CalanderScreen from './calendar/CalanderScreen';
import ProfileScreen from './profile/ProfileScreen';
import GymScreeen from './gym/GymScreen';
import FriendsScreen from './friends/FriendsScreen';

const MainTab = createBottomTabNavigator();


// ALL THESE SCREEN NAMES SHOULD BE CHANGED TO STACK 

const MainNavigator = () => {
    return(
    <MainTab.Navigator>
        <MainTab.Screen name="Profile" component={ProfileScreen}/>
        <MainTab.Screen name="Gym" component={GymScreeen} />
        <MainTab.Screen name="Calendar" component={CalanderScreen}/>
        <MainTab.Screen name="Friends" component={FriendsScreen}/>
    </MainTab.Navigator>
    )
}

export default MainNavigator;