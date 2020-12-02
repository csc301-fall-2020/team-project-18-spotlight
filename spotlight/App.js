import "react-native-gesture-handler";
import React from "react";
import AppNavigator from "./screens/AppNavigator";
import firebase from "firebase/app";
import { useFonts, Raleway_600SemiBold } from "@expo-google-fonts/raleway";
import { AuthProvider } from "./screens/authentication/EmailContext/AuthProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import {ActivityIndicator} from 'react-native';
import { firebaseConfig } from "./config";
import { ActivityIndicator, Colors } from "react-native-paper";
import { LogBox } from "react-native";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  LogBox.ignoreLogs(["Setting a timer"]);
  const [fontsLoaded] = useFonts({ Raleway_600SemiBold });

  if (!fontsLoaded) {
    return (
      <ActivityIndicator size="large" animating={true} color={Colors.red800} />
    );
    // <ActivityIndicator size="large"/>;
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
