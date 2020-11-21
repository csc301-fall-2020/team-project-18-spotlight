import "react-native-gesture-handler";
import React from "react";
import AppNavigator from "./screens/AppNavigator";
import * as firebase from "firebase";
import { useFonts, Raleway_600SemiBold } from "@expo-google-fonts/raleway";
import { AuthProvider } from "./screens/authentication/EmailContext/AuthProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {ActivityIndicator} from 'react-native';
import {firebaseConfig} from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  let [fontsLoaded] = useFonts({ Raleway_600SemiBold });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large"/>;
  }
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default App;
