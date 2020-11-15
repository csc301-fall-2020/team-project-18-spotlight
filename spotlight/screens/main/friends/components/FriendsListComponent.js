import React from "react";
import { Text, View, SectionList, StyleSheet, Pressable } from "react-native";
import { Avatar } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

const Header = ({ title }) => {
  return (
    <View>
      <Text style={styles.requestHeader}>{title}</Text>
    </View>
  );
};

const FriendRequest = ({ name, onPress }) => {
  return (
    <View style={styles.friendContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Avatar.Text
          size={64}
          label={name.slice(0, 3)}
          style={styles.avatarStyle}
          labelStyle={styles.avatarLabelStyle}
        />
        <Text style={styles.friendName}>{name}</Text>
      </TouchableOpacity>
      <Entypo
        name="check"
        size={24}
        color="#adadad"
        style={{ position: "absolute", right: "20%" }}
      />
      <Entypo
        name="block"
        size={24}
        color="#adadad"
        style={{ position: "absolute", right: "7.5%" }}
      />
    </View>
  );
};

const Friend = ({ name, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.friendContainer}>
        <Avatar.Text
          size={64}
          label={name.slice(0, 3)}
          style={styles.avatarStyle}
          labelStyle={styles.avatarLabelStyle}
        />
        <Text style={styles.friendName}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  requestHeader: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 24,
    fontStyle: "normal",
    paddingBottom: "1%",
  },
  friendContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "3%",
  },
  friendName: {
    marginLeft: 10,
    fontSize: 20,
    fontFamily: "Raleway_600SemiBold",
  },
  avatarStyle: {
    backgroundColor: "#A20A0A",
    borderRadius: 10,
  },
  avatarLabelStyle: {
    fontSize: 24,
  },
});

export { FriendRequest, Header, Friend };
