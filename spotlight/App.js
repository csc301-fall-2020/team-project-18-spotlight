import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './screens/AppNavigator';
import {useFonts, Raleway_600SemiBold} from '@expo-google-fonts/raleway'
import { AppLoading } from 'expo';


export default function App() {

  let [fontsLoaded] = useFonts({Raleway_600SemiBold});

  if (!fontsLoaded){
      return <AppLoading/>
  }
  return (
    <AppNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
