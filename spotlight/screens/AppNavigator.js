import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./main/MainNavigator";
import AuthNavigator from "./authentication/AuthNavigator";
import { AppLoading } from 'expo';
import * as firebase from 'firebase';
import { AuthContext } from './authentication/EmailContext/AuthProvider';


const AppStack = createStackNavigator();

const AppNavigator = () => {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  }

  useEffect(() => {
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (loading){
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
