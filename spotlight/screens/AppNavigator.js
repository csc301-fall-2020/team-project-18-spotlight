import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./main/MainNavigator";
import AuthNavigator from "./authentication/AuthNavigator";
import { Text, View } from "react-native";

const AppStack = createStackNavigator();

// THIS SHOULD BE IN A TERNARY STATEMENT WITH LOGGED IN?
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false,
        }}
      >
        <AppStack.Screen name="Auth" component={AuthNavigator} />
        <AppStack.Screen name="Main" component={MainNavigator} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
