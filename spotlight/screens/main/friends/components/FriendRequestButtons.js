import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";

const AcceptFriendRequest = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} hitSlop={20}>
      {({ pressed }) => {
        return pressed ? (
          <Entypo name="check" size={24} color="green" />
        ) : (
          <Entypo name="check" size={24} color="#adadad" />
        );
      }}
    </Pressable>
  );
};

const RejectFriendRequest = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} hitSlop={20}>
      {({ pressed }) => {
        return pressed ? (
          <Entypo name="block" size={24} color="red" />
        ) : (
          <Entypo name="block" size={24} color="#adadad" />
        );
      }}
    </Pressable>
  );
};

export { AcceptFriendRequest, RejectFriendRequest };
