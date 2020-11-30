import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./main/MainNavigator";
import AuthNavigator from "./authentication/AuthNavigator";
import * as firebase from "firebase";
import { AuthContext } from "./authentication/EmailContext/AuthProvider";
import { createNewUser } from "../services/userService";
import { ActivityIndicator } from "react-native";

const AppStack = createStackNavigator();

const AppNavigator = () => {
  const { user, setUser, isNewUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    (async () => {
      await setUser(user);
      if (initializing) setInitializing(false);
      setLoading(false);
    })();
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user == null || (user != null && isNewUser) ? (
          <AppStack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <AppStack.Screen name="Main" component={MainNavigator} />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
