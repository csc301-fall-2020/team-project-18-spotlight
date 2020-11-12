import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./main/MainNavigator";
import AuthNavigator from "./authentication/AuthNavigator";
import { Text, View } from "react-native";
import GymInfo from "./main/gym/screens/GymInfo";

const AppStack = createStackNavigator();

// THIS SHOULD BE IN A TERNARY STATEMENT WITH LOGGED IN?
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName="Auth"
        mode="modal"
        screenOptions={{
          headerShown: false,
        }}
      >
        <AppStack.Screen name="Auth" component={AuthNavigator} />
        <AppStack.Screen name="Main" component={MainNavigator} />
        <AppStack.Screen name="GymInfo" component={GymInfo} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
