import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./main/MainNavigator";
import AuthNavigator from "./authentication/AuthNavigator";
import Loading from './shared/Loading';
import { auth } from 'firebase';
import { AppLoading } from 'expo';
// import * as Font from 'expo-font';
import {useFonts, Raleway_600SemiBold} from '@expo-google-fonts/raleway';


const AppStack = createStackNavigator();

const AppNavigator = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  let [fontsLoaded] = useFonts({Raleway_600SemiBold});

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  }

  useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (loading) {
      return <Loading />;
    }

  if (!fontsLoaded){
    return <AppLoading/>
  }
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user == null ? (
          <AppStack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <AppStack.Screen name="Main" component={MainNavigator} />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
