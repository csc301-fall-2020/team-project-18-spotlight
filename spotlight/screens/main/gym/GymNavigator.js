import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "./screens/MapScreen";
import GymInfo from "./screens/GymInfo";
import SearchResults from "./screens/SearchResults";
import GymMessages from "./screens/GymMessages";

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
      <GymStack.Screen name="Search Results" component={SearchResults} />
      <GymStack.Screen name="Gym Messages" component={GymMessages} />
    </GymStack.Navigator>
  );
};

export default GymNavigator;
