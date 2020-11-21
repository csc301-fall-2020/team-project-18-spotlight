import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "./screens/MapScreen";
import GymInfo from "./screens/GymInfo";

const GymStack = createStackNavigator();

const GymNavigator = () => {
  return (
    <GymStack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
      }}
    >
      <GymStack.Screen name="Gym Stack" component={MapScreen} />
      <GymStack.Screen name="GymInfo" component={GymInfo} />
    </GymStack.Navigator>
  );
};

export default GymNavigator;
