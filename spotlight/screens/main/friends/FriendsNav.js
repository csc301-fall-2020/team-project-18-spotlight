import React from "react";
import FriendsScreen from "./screens/FriendsScreen";
import FriendProfile from "./screens/FriendProfile";
import { createStackNavigator } from "@react-navigation/stack";

const FriendsStack = createStackNavigator();

const FriendsNav = () => {
  return (
    <FriendsStack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
      }}
    >
      <FriendsStack.Screen name="Friends Screen" component={FriendsScreen} />
      <FriendsStack.Screen name="Friend Profile" component={FriendProfile} />
    </FriendsStack.Navigator>
  );
};

export default FriendsNav;
