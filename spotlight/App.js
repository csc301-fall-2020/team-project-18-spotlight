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

/**
 * Welcome to the spotlight app code base. It is maze to navigate, so hopefully this
 * comment helps you out a little.
 *
 * There are two main folders with our code:
 * Screens and services.
 *
 * Screens contain the front end aspect of our codebase. It is split based on two different paths:
 * Authentication and Main. Authentication includes sign in, sign up, and the onboarding process.
 * Main includes the actual app. AppNavigator is how we navigate between authentication and main.
 *
 * Within main and authentication, it is split up even further, and the layout is pretty identical f
 * for most of them. There is a screens folder and a components folder, as well as a navigator. Each nested
 * stack navigator allows us to have multiple screens per tab.
 *
 *
 * Services contain the firebase calls that our front end depends on.
 * Please note that not all services were used. We are also using the web sdk for firebase, as the app
 * uses expo and react native firebase is not supported by expo.
 *
 * If you are new to this like we were, you should research about react navigation and how firebase works
 * to get a better sense of how things work.
 *
 * Also we were working on this with an insane time crunch, so please forgive some messy code and/or incomplete
 * documentation.
 *
 * If the team reading this is from UofT's CSC301 group, good luck. You'll need it.
 */

const App = () => {
  // === REMOVE LATER ===
  LogBox.ignoreLogs(["Setting a timer"]);
  LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  // === END REMOVE LATER ===

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
