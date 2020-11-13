import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import FriendsScreen from "./screens/FriendsScreen";
import FriendProfile from "./screens/FriendProfile";
import { createStackNavigator } from "@react-navigation/stack";

const FriendsStack = createStackNavigator()

const FriendsNav = () => {
    return (
        <FriendsStack.Navigator
         mode="modal"
         screenOptions={{
          headerShown: false,
        }}
        >
            <FriendsStack.Screen name="Friends Screen" component={FriendsScreen}/>
            <FriendsStack.Screen name="Friend Profile" component={FriendProfile}/>
        </FriendsStack.Navigator>
    )
}

export default FriendsNav;