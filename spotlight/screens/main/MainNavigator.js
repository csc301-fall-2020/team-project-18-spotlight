import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import CalendarNav from "./calendar/CalendarNav";
import CalendarScreen from "./calendar/screens/CalendarScreen";
import ProfileScreen from "./profile/ProfileScreen";
import GymScreeen from "./gym/GymScreen";
import FriendsScreen from "./friends/FriendsScreen";

const MainTab = createBottomTabNavigator();

// ALL THESE SCREEN NAMES SHOULD BE CHANGED TO STACK

const MainNavigator = () => {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Profile":
              iconName = "user";
              break;
            case "Gym":
              iconName = "map";
              break;
            case "Calendar":
              iconName = "calendar";
              break;
            case "Friends":
              iconName = "users";
              break;
          }

          return <Entypo name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "black",
        activeBackgroundColor: "#A20A0A",
        inactiveBackgroundColor: "white",
        tabStyle: { paddingBottom: "7%" },
        style: { height: "9%" },
        safeAreaInsets: { bottom: 0 },
        showLabel: false,
      }}
    >
      <MainTab.Screen name="Profile" component={ProfileScreen} />
      <MainTab.Screen name="Gym" component={GymScreeen} />
      <MainTab.Screen name="Calendar" component={CalendarNav} />
      <MainTab.Screen name="Friends" component={FriendsScreen} />
    </MainTab.Navigator>
  );
};

export default MainNavigator;
