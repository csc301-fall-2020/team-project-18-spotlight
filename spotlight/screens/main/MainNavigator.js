import React from "react";
import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CalendarNav from "./calendar/CalendarNav";
import ProfileNav from "./profile/ProfileNav";
import FriendsNav from "./friends/FriendsNav";
import GymNavigator from "./gym/GymNavigator";

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
        tabStyle: { paddingBottom: "0%" },
        style: { height: "9%" },
        safeAreaInsets: { bottom: 0 },
        showLabel: false,
      }}
    >
      <MainTab.Screen name="Profile" component={ProfileNav} />
      <MainTab.Screen name="Gym" component={GymNavigator} />
      <MainTab.Screen name="Calendar" component={CalendarNav} />
      <MainTab.Screen name="Friends" component={FriendsNav} />
    </MainTab.Navigator>
  );
};

export default MainNavigator;
